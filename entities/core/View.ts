import { z } from "zod";
import { AUTH_TOKEN } from "./Auth.js";
import {
  EntityId,
  ApiModel,
  ApiHeaders,
  ViewData,
  FilterObject,
} from "./type.js";

export type ViewNameMapping<M extends ApiModel> = {
  [P in keyof z.infer<M>]?: string;
};

export type GetOptions = Partial<{
  headers: ApiHeaders;
}>;

export type ViewOptions<R extends ApiModel> = {
  idField: string;
  nameMapper: ViewNameMapping<R>;
  embeddedViews: { alias?: string; view: string }[];
};

export const VIEW_DEFAULT_OPTIONS: ViewOptions<any> = {
  idField: "id",
  nameMapper: {},
  embeddedViews: [],
};

export class View<ResponseModel extends ApiModel> {
  schema: string;
  view: string;
  select: string;
  responseModel: ResponseModel;
  options: ViewOptions<ResponseModel>;

  constructor(
    schema: string,
    view: string,
    responseModel: ResponseModel,
    options: Partial<ViewOptions<ResponseModel>> = {}
  ) {
    this.schema = schema;
    this.view = view;
    this.responseModel = responseModel;
    this.options = { ...VIEW_DEFAULT_OPTIONS, ...options };

    //Generate postgrest select string to restrict fields
    let select = "",
      first = true;

    for (let field in responseModel.shape) {
      const isEmbeddedView = this.options.embeddedViews.some((v) =>
        v.alias ? v.alias === field : v.view === field
      );

      if (isEmbeddedView) continue;

      if (!first) select += ",";
      else first = false;

      select += field;
    }

    for (let eView of this.options.embeddedViews) {
      select += `,${eView.alias ? `${eView.alias}:` : ""}${eView.view}(*)`;
    }

    this.select = select;
  }

  async getAll(filters?: FilterObject) {
    const searchParams = new URLSearchParams();
    searchParams.append("select", this.select);

    if (filters)
      for (let filter in filters) searchParams.append(filter, filters[filter]);

    const response = await fetch(
      `https://audomia.it:3000/${this.view}?${searchParams.toString()}`,
      {
        headers: {
          Accept: "application/json",
          "Accept-Profile": this.schema,
          Authorization: AUTH_TOKEN,
        },
      }
    );

    const data = await response.json();
    const serializedResponse = this.responseModel.array().parse(data);
    return serializedResponse;
  }

  async get(
    id?: EntityId,
    options?: GetOptions
  ): Promise<z.infer<ResponseModel>> {
    const searchParams = new URLSearchParams();
    searchParams.append("select", this.select);

    if (this.idField !== "NO-ID")
      searchParams.append(String(this.idField), `eq.${id}`);

    //Generate request headers
    let headers: ApiHeaders = {
      Accept: "application/vnd.pgrst.object+json",
      "Accept-Profile": this.schema,
      Authorization: AUTH_TOKEN,
    };

    if (options?.headers) {
      headers = { ...headers, ...options.headers };
    }

    const response = await fetch(`${this.view}?${searchParams.toString()}`, {
      headers,
    });

    const data = await response.json();
    const serializedResponse = this.responseModel.parse(data);
    return serializedResponse;
  }

  getMappedFieldName(field: keyof z.infer<ResponseModel>): string {
    let str = "";
    if (this.options.nameMapper[field])
      str = this.options.nameMapper[field] as string;
    else str = field as string;

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  get idField(): keyof z.infer<ResponseModel> {
    return this.options.idField;
  }

  getRowId(row: ViewData<this>) {
    return row[this.idField];
  }
}
