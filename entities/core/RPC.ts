import _ from "lodash";
import { z } from "zod";
import { formatDate } from "../../utils.js";
import { ApiHeaders, ApiModel } from "./type.js";

export type RpcConstantsBaseTypes =
  | number
  | boolean
  | null
  | string
  | Date
  | RpcConstantsBaseTypes[]
  | { [key: string]: RpcConstantsBaseTypes };

export type RpcConstants = {
  [key: string]: RpcConstantsBaseTypes | RpcConstantsBaseTypes[];
};
export type RpcOptions = {
  singleObject?: boolean;
};

function parseDate(data: { [x: string]: any }) {
  for (let key in data) {
    if (data[key] instanceof Date) data[key] = formatDate(data[key]);
    else if (
      !!data[key] &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      data[key] = parseDate(data[key]);
    }
  }

  return data;
}

export type RPCResponseModel =
  | ApiModel
  | z.ZodNull
  | z.ZodString
  | z.ZodNumber
  | z.ZodUnknown;

export class RPC<
  DataModel extends ApiModel,
  ResponseModel extends RPCResponseModel,
  C extends RpcConstants
> {
  schema: string;
  rpc: string;
  responseModel: ResponseModel;
  dataModel: DataModel;
  constants: C;
  sideEffects: (
    response: z.infer<ResponseModel>,
    data: z.infer<DataModel>
  ) => void;
  options: RpcOptions;

  constructor(
    schema: string,
    rpc: string,
    dataModel: DataModel,
    responseModel: ResponseModel,
    constants: C,
    sideEffects?: (
      response: z.infer<ResponseModel>,
      data: z.infer<DataModel>
    ) => void,
    options: RpcOptions = {}
  ) {
    this.schema = schema;
    this.rpc = rpc;
    this.responseModel = responseModel;
    this.dataModel = dataModel;
    this.constants = constants;
    this.options = options;
    const defaultFunction = () => {};
    this.sideEffects = sideEffects ?? defaultFunction;
  }

  async call(
    data: ObjectOmitIntesection<z.input<DataModel>, C>,
    sideEffects?: (
      res: z.infer<ResponseModel>,
      data: z.input<DataModel>
    ) => void
  ): Promise<z.infer<ResponseModel>> {
    //Create data object to merge constants values anda data passed to function
    const fullData = _.merge(data, this.constants);

    //Check for runtime errors
    //and parse Date object to correct backend string format
    let serializedData: any;

    try {
      serializedData = parseDate(this.dataModel.parse(fullData));
    } catch (e) {
      console.error(e);
      throw new Error("RPC Data serialization error");
    }

    //Generate header object
    const headers: ApiHeaders = {
      "Content-Profile": this.schema,
    };

    if (this.options.singleObject) headers["Prefer"] = "params=single-object";

    //Send request to postgrest
    const response = await fetch(`rpc/${this.rpc}`, {
      method: "POST",
      headers,
      body: JSON.stringify(serializedData),
    });

    const responseData = await response.json();

    //Serialize response to check correct data-types
    const serializedResponse = this.responseModel.parse(responseData);

    //Call Rpc side effects like endpoint cache invalidation or update
    sideEffects?.(serializedResponse, serializedData);
    this.sideEffects(serializedResponse, serializedData);

    return serializedResponse;
  }
}

export type RemoveNever<T> = {
  [K in keyof T as T[K] extends never
    ? never
    : T[K] extends object
    ? keyof T[K] extends never
      ? never
      : K
    : K]: T[K];
};

export type ObjectOmitIntesection<A, B> = RemoveNever<{
  [Key in keyof A]: Key extends keyof B
    ? A[Key] extends any[]
      ? never
      : A[Key] extends object
      ? ObjectOmitIntesection<A[Key], B[Key]>
      : never
    : A[Key];
}>;
