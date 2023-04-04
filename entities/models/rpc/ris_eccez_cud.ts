import { z } from "zod";
import { nullableApiDate } from "../../core/apiDate.js";
import { RPC } from "../../core/RPC.js";
import { nullableNumber, nullableString } from "../../core/zodUtils.js";
import { Entities } from "../../Entities.js";
import { Schema } from "../../Schema.js";

const data = z.object({
  in_operaz: z.string(),
  in_ris_eccez: z.object({
    in_id: nullableNumber,
    in_risorsa_id: nullableNumber,
    in_data_da: nullableApiDate,
    in_data_a: nullableApiDate,
    in_variaz_ore: nullableNumber,
    in_eccezione: nullableString,
    in_causale: nullableString,
    in_nota: nullableString,
  }),
});

const response = z.object({
  id: nullableNumber,
  risorsa_id: nullableNumber,
  data_da: nullableApiDate,
  data_a: nullableApiDate,
  variaz_ore: nullableNumber,
  frazione: nullableNumber,
  eccezione: nullableString,
  causale: nullableString,
  nota: nullableString,
});

export const ris_eccez_create = new RPC(
  Schema.LASE,
  "ris_eccez_cud",
  data,
  response,
  {
    in_operaz: "C",
    in_ris_eccez: {
      in_id: null,
    },
  },
  () => {
    Entities.ResourceExceptions.invalidate({});
    Entities.WeeklyResourceCommitments.deepInvalidate();
  }
);
export const ris_eccez_update = new RPC(
  Schema.LASE,
  "ris_eccez_cud",
  data,
  response,
  {
    in_operaz: "U",
  },
  () => {
    Entities.ResourceExceptions.invalidate({});
    Entities.WeeklyResourceCommitments.deepInvalidate();
  }
);

export const ris_eccez_delete = new RPC(
  Schema.LASE,
  "ris_eccez_cud",
  data,
  response,
  {
    in_operaz: "D",
    in_ris_eccez: {
      in_risorsa_id: null,
      in_data_da: null,
      in_data_a: null,
      in_variaz_ore: null,
      in_eccezione: null,
      in_causale: null,
      in_nota: null,
    },
  },
  () => {
    Entities.ResourceExceptions.invalidate({});
    Entities.WeeklyResourceCommitments.deepInvalidate();
  }
);
