export interface MonthRecord {
  mes: string;
  num: number;
  tipo: 'Realizado' | 'Proyectado';
  'Ingreso Neto': number;
  'Costos de Producción': number;
  'Gastos del Personal': number;
  'Gastos de Ventas': number;
  'Gastos de Ocupación': number;
  'Otros Gastos': number;
  'Impuestos y Tasas': number;
  'Gastos Financieros': number;
  'UT Operativa': number;
}

export interface RawData {
  pl_monthly: Record<string, MonthRecord[]>;
  sucs: string[];
}

export const RAW: RawData = {
  pl_monthly: {
    "La Provista": [
      { "mes": "Ene", "num": 1, "tipo": "Realizado", "Ingreso Neto": 641927540, "Costos de Producción": 285242803, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 21228448, "UT Operativa": 153059131 },
      { "mes": "Feb", "num": 2, "tipo": "Realizado", "Ingreso Neto": 536149528, "Costos de Producción": 276543798, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 17761286, "UT Operativa": 4762978 },
      { "mes": "Mar", "num": 3, "tipo": "Realizado", "Ingreso Neto": 575701039, "Costos de Producción": 296654044, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 22838111, "UT Operativa": 22496515 },
      { "mes": "Abr", "num": 4, "tipo": "Realizado", "Ingreso Neto": 560165945, "Costos de Producción": 280263863, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 21256871, "UT Operativa": 102287354 },
      { "mes": "May", "num": 5, "tipo": "Proyectado", "Ingreso Neto": 707614946, "Costos de Producción": 312791516, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 21228448, "UT Operativa": 131594981 },
      { "mes": "Jun", "num": 6, "tipo": "Proyectado", "Ingreso Neto": 592042866, "Costos de Producción": 261704458, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 17761286, "UT Operativa": 70577122 },
      { "mes": "Jul", "num": 7, "tipo": "Proyectado", "Ingreso Neto": 761270359, "Costos de Producción": 336509158, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 22838111, "UT Operativa": 159923090 },
      { "mes": "Ago", "num": 8, "tipo": "Proyectado", "Ingreso Neto": 708562353, "Costos de Producción": 313210304, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 21256871, "UT Operativa": 132095178 },
      { "mes": "Sep", "num": 9, "tipo": "Proyectado", "Ingreso Neto": 638339228, "Costos de Producción": 282169132, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 19150177, "UT Operativa": 95019919 },
      { "mes": "Oct", "num": 10, "tipo": "Proyectado", "Ingreso Neto": 681784505, "Costos de Producción": 301373523, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 20453535, "UT Operativa": 117957447 },
      { "mes": "Nov", "num": 11, "tipo": "Proyectado", "Ingreso Neto": 688469386, "Costos de Producción": 304257170, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 20684216, "UT Operativa": 121486822 },
      { "mes": "Dic", "num": 12, "tipo": "Proyectado", "Ingreso Neto": 629395753, "Costos de Producción": 278429937, "Gastos del Personal": 180000000, "Gastos de Ventas": 3700000, "Gastos de Ocupación": 50000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1300000, "Gastos Financieros": 18969537, "UT Operativa": 90298091 }
    ],
    "Pez de Mar Dulce": [
      { "mes": "Ene", "num": 1, "tipo": "Realizado", "Ingreso Neto": 259599160, "Costos de Producción": 101945421, "Gastos del Personal": 87271459, "Gastos de Ventas": 4527433, "Gastos de Ocupación": 37794509, "Otros Gastos": 6243846, "Impuestos y Tasas": 853895, "Gastos Financieros": 8308599, "UT Operativa": 12653998 },
      { "mes": "Feb", "num": 2, "tipo": "Realizado", "Ingreso Neto": 274225812, "Costos de Producción": 137351442, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 9310015, "UT Operativa": -48130715 },
      { "mes": "Mar", "num": 3, "tipo": "Realizado", "Ingreso Neto": 223504852, "Costos de Producción": 117731004, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 10338708, "UT Operativa": -70026162 },
      { "mes": "Abr", "num": 4, "tipo": "Realizado", "Ingreso Neto": 286579457, "Costos de Producción": 147437785, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 10505720, "UT Operativa": -41667460 },
      { "mes": "May", "num": 5, "tipo": "Proyectado", "Ingreso Neto": 413234103, "Costos de Producción": 177690664, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 12397023, "UT Operativa": 62046416 },
      { "mes": "Jun", "num": 6, "tipo": "Proyectado", "Ingreso Neto": 310333846, "Costos de Producción": 133443554, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 9310015, "UT Operativa": 6480277 },
      { "mes": "Jul", "num": 7, "tipo": "Proyectado", "Ingreso Neto": 344623587, "Costos de Producción": 148188142, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 10338708, "UT Operativa": 24996737 },
      { "mes": "Ago", "num": 8, "tipo": "Proyectado", "Ingreso Neto": 350190652, "Costos de Producción": 150581980, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 10505720, "UT Operativa": 28002952 },
      { "mes": "Sep", "num": 9, "tipo": "Proyectado", "Ingreso Neto": 284300969, "Costos de Producción": 122249417, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 8529029, "UT Operativa": -7577477 },
      { "mes": "Oct", "num": 10, "tipo": "Proyectado", "Ingreso Neto": 428604956, "Costos de Producción": 184300131, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 12858149, "UT Operativa": 70346676 },
      { "mes": "Nov", "num": 11, "tipo": "Proyectado", "Ingreso Neto": 248066775, "Costos de Producción": 106892577, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 7437369, "UT Operativa": -27462171 },
      { "mes": "Dic", "num": 12, "tipo": "Proyectado", "Ingreso Neto": 368009831, "Costos de Producción": 158250562, "Gastos del Personal": 112000000, "Gastos de Ventas": 4500000, "Gastos de Ocupación": 37000000, "Otros Gastos": 6500000, "Impuestos y Tasas": 1100000, "Gastos Financieros": 11053230, "UT Operativa": 37942039 }
    ],
    "Patria": [
      { "mes": "Ene", "num": 1, "tipo": "Realizado", "Ingreso Neto": 677052169, "Costos de Producción": 269078494, "Gastos del Personal": 119611642, "Gastos de Ventas": 26443320, "Gastos de Ocupación": 48837520, "Otros Gastos": 6243845, "Impuestos y Tasas": 853895, "Gastos Financieros": 22135625, "UT Operativa": 183847827 },
      { "mes": "Feb", "num": 2, "tipo": "Realizado", "Ingreso Neto": 729300137, "Costos de Producción": 366090548, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 22201475, "UT Operativa": 166332128 },
      { "mes": "Mar", "num": 3, "tipo": "Realizado", "Ingreso Neto": 762567026, "Costos de Producción": 401040359, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 25228988, "UT Operativa": 159493183 },
      { "mes": "Abr", "num": 4, "tipo": "Realizado", "Ingreso Neto": 807966176, "Costos de Producción": 359248462, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 23918395, "UT Operativa": 237212333 },
      { "mes": "May", "num": 5, "tipo": "Proyectado", "Ingreso Neto": 814766913, "Costos de Producción": 350349773, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 24443007, "UT Operativa": 256059383 },
      { "mes": "Jun", "num": 6, "tipo": "Proyectado", "Ingreso Neto": 740049170, "Costos de Producción": 318221143, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 22201475, "UT Operativa": 215711802 },
      { "mes": "Jul", "num": 7, "tipo": "Proyectado", "Ingreso Neto": 840966279, "Costos de Producción": 361615500, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 25228988, "UT Operativa": 270207041 },
      { "mes": "Ago", "num": 8, "tipo": "Proyectado", "Ingreso Neto": 858847355, "Costos de Producción": 369304363, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 25765421, "UT Operativa": 279862822 },
      { "mes": "Sep", "num": 9, "tipo": "Proyectado", "Ingreso Neto": 815133592, "Costos de Producción": 350507444, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 24454008, "UT Operativa": 256257390 },
      { "mes": "Oct", "num": 10, "tipo": "Proyectado", "Ingreso Neto": 915009596, "Costos de Producción": 393454126, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 27450288, "UT Operativa": 310190432 },
      { "mes": "Nov", "num": 11, "tipo": "Proyectado", "Ingreso Neto": 1082746186, "Costos de Producción": 465665974, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 32498335, "UT Operativa": 401181877 },
      { "mes": "Dic", "num": 12, "tipo": "Proyectado", "Ingreso Neto": 753366976, "Costos de Producción": 323862494, "Gastos del Personal": 121000000, "Gastos de Ventas": 8000000, "Gastos de Ocupación": 46000000, "Otros Gastos": 7000000, "Impuestos y Tasas": 1400000, "Gastos Financieros": 22620893, "UT Operativa": 223683589 }
    ],
    "Pinton": [
      { "mes": "Ene", "num": 1, "tipo": "Realizado", "Ingreso Neto": 271276363, "Costos de Producción": 105518810, "Gastos del Personal": 92620644, "Gastos de Ventas": 4846705, "Gastos de Ocupación": 33721865, "Otros Gastos": 6243845, "Impuestos y Tasas": 808891, "Gastos Financieros": 9248909, "UT Operativa": 18266694 },
      { "mes": "Feb", "num": 2, "tipo": "Realizado", "Ingreso Neto": 250676930, "Costos de Producción": 129557636, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 7801036, "UT Operativa": -24618317 },
      { "mes": "Mar", "num": 3, "tipo": "Realizado", "Ingreso Neto": 252637895, "Costos de Producción": 134342208, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 9186856, "UT Operativa": -16841414 },
      { "mes": "Abr", "num": 4, "tipo": "Realizado", "Ingreso Neto": 231708272, "Costos de Producción": 107368575, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 10423848, "UT Operativa": -1837766 },
      { "mes": "May", "num": 5, "tipo": "Proyectado", "Ingreso Neto": 375332805, "Costos de Producción": 161393106, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 11259984, "UT Operativa": 71159715 },
      { "mes": "Jun", "num": 6, "tipo": "Proyectado", "Ingreso Neto": 260034542, "Costos de Producción": 111814853, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 7801036, "UT Operativa": 8898652 },
      { "mes": "Jul", "num": 7, "tipo": "Proyectado", "Ingreso Neto": 306228533, "Costos de Producción": 131678269, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 9186856, "UT Operativa": 33843408 },
      { "mes": "Ago", "num": 8, "tipo": "Proyectado", "Ingreso Neto": 347461589, "Costos de Producción": 149408483, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 10423848, "UT Operativa": 56109258 },
      { "mes": "Sep", "num": 9, "tipo": "Proyectado", "Ingreso Neto": 244840069, "Costos de Producción": 105281230, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 7345202, "UT Operativa": 693637 },
      { "mes": "Oct", "num": 10, "tipo": "Proyectado", "Ingreso Neto": 446796855, "Costos de Producción": 192122648, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 13403906, "UT Operativa": 109750302 },
      { "mes": "Nov", "num": 11, "tipo": "Proyectado", "Ingreso Neto": 356801447, "Costos de Producción": 153435624, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 10697244, "UT Operativa": 61148579 },
      { "mes": "Dic", "num": 12, "tipo": "Proyectado", "Ingreso Neto": 324199428, "Costos de Producción": 139454552, "Gastos del Personal": 92000000, "Gastos de Ventas": 6600000, "Gastos de Ocupación": 25500000, "Otros Gastos": 7200000, "Impuestos y Tasas": 220000, "Gastos Financieros": 9723720, "UT Operativa": 43501156 }
    ],
    "Porvenir": [
      { "mes": "Ene", "num": 1, "tipo": "Realizado", "Ingreso Neto": 349456278, "Costos de Producción": 137855165, "Gastos del Personal": 104528300, "Gastos de Ventas": 1731160, "Gastos de Ocupación": 19327759, "Otros Gastos": 5926781, "Impuestos y Tasas": 854685, "Gastos Financieros": 11628272, "UT Operativa": 67604155 },
      { "mes": "Feb", "num": 2, "tipo": "Realizado", "Ingreso Neto": 309486966, "Costos de Producción": 151897384, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 8003964 },
      { "mes": "Mar", "num": 3, "tipo": "Realizado", "Ingreso Neto": 303982212, "Costos de Producción": 159778855, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 11532316 },
      { "mes": "Abr", "num": 4, "tipo": "Realizado", "Ingreso Neto": 290626638, "Costos de Producción": 152027406, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 12092089 },
      { "mes": "May", "num": 5, "tipo": "Proyectado", "Ingreso Neto": 350000000, "Costos de Producción": 150500000, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 60900000 },
      { "mes": "Jun", "num": 6, "tipo": "Proyectado", "Ingreso Neto": 350000000, "Costos de Producción": 150500000, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 60900000 },
      { "mes": "Jul", "num": 7, "tipo": "Proyectado", "Ingreso Neto": 350000000, "Costos de Producción": 150500000, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 60900000 },
      { "mes": "Ago", "num": 8, "tipo": "Proyectado", "Ingreso Neto": 350000000, "Costos de Producción": 150500000, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 60900000 },
      { "mes": "Sep", "num": 9, "tipo": "Proyectado", "Ingreso Neto": 354269009, "Costos de Producción": 152335674, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 63333335 },
      { "mes": "Oct", "num": 10, "tipo": "Proyectado", "Ingreso Neto": 468607902, "Costos de Producción": 201501398, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 128506504 },
      { "mes": "Nov", "num": 11, "tipo": "Proyectado", "Ingreso Neto": 351896329, "Costos de Producción": 151337381, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 61958948 },
      { "mes": "Dic", "num": 12, "tipo": "Proyectado", "Ingreso Neto": 391458439, "Costos de Producción": 168304558, "Gastos del Personal": 94000000, "Gastos de Ventas": 2400000, "Gastos de Ocupación": 24000000, "Otros Gastos": 7200000, "Impuestos y Tasas": 1000000, "Gastos Financieros": 10000000, "UT Operativa": 84553881 }
    ],
    "Pétalo de Estrellas": [
      { "mes": "Ene", "num": 1, "tipo": "Realizado", "Ingreso Neto": 767434589, "Costos de Producción": 165173107, "Gastos del Personal": 133523366, "Gastos de Ventas": 23724445, "Gastos de Ocupación": 45343702, "Otros Gastos": 34854330, "Impuestos y Tasas": 45530, "Gastos Financieros": 24590785, "UT Operativa": 340179324 },
      { "mes": "Feb", "num": 2, "tipo": "Realizado", "Ingreso Neto": 167572030, "Costos de Producción": 83683905, "Gastos del Personal": 9190607, "Gastos de Ventas": 17636364, "Gastos de Ocupación": 2362122, "Otros Gastos": 15413864, "Impuestos y Tasas": 41708, "Gastos Financieros": 12081029, "UT Operativa": 27162431 },
      { "mes": "Mar", "num": 3, "tipo": "Realizado", "Ingreso Neto": 12993345, "Costos de Producción": 9994254, "Gastos del Personal": 412727, "Gastos de Ventas": 2646364, "Gastos de Ocupación": 2617849, "Otros Gastos": 6323819, "Impuestos y Tasas": 68900, "Gastos Financieros": 1697740, "UT Operativa": -10768308 },
      { "mes": "Abr", "num": 4, "tipo": "Realizado", "Ingreso Neto": 114948394, "Costos de Producción": 58696689, "Gastos del Personal": 16240000, "Gastos de Ventas": 0, "Gastos de Ocupación": 4544168, "Otros Gastos": 10832874, "Impuestos y Tasas": 69670, "Gastos Financieros": 5257811, "UT Operativa": 19307182 },
      { "mes": "May", "num": 5, "tipo": "Proyectado", "Ingreso Neto": 0, "Costos de Producción": 0, "Gastos del Personal": 0, "Gastos de Ventas": 0, "Gastos de Ocupación": 0, "Otros Gastos": 0, "Impuestos y Tasas": 0, "Gastos Financieros": 0, "UT Operativa": 0 },
      { "mes": "Jun", "num": 6, "tipo": "Proyectado", "Ingreso Neto": 0, "Costos de Producción": 0, "Gastos del Personal": 0, "Gastos de Ventas": 0, "Gastos de Ocupación": 0, "Otros Gastos": 0, "Impuestos y Tasas": 0, "Gastos Financieros": 0, "UT Operativa": 0 },
      { "mes": "Jul", "num": 7, "tipo": "Proyectado", "Ingreso Neto": 0, "Costos de Producción": 0, "Gastos del Personal": 0, "Gastos de Ventas": 0, "Gastos de Ocupación": 0, "Otros Gastos": 0, "Impuestos y Tasas": 0, "Gastos Financieros": 0, "UT Operativa": 0 },
      { "mes": "Ago", "num": 8, "tipo": "Proyectado", "Ingreso Neto": 118414768, "Costos de Producción": 43797782, "Gastos del Personal": 23694409, "Gastos de Ventas": 61176641, "Gastos de Ocupación": 50613704, "Otros Gastos": 48170646, "Impuestos y Tasas": 45794, "Gastos Financieros": 15897561, "UT Operativa": -125001769 },
      { "mes": "Sep", "num": 9, "tipo": "Proyectado", "Ingreso Neto": 0, "Costos de Producción": 0, "Gastos del Personal": 0, "Gastos de Ventas": 0, "Gastos de Ocupación": 0, "Otros Gastos": 0, "Impuestos y Tasas": 0, "Gastos Financieros": 0, "UT Operativa": 0 },
      { "mes": "Oct", "num": 10, "tipo": "Proyectado", "Ingreso Neto": 0, "Costos de Producción": 0, "Gastos del Personal": 0, "Gastos de Ventas": 0, "Gastos de Ocupación": 0, "Otros Gastos": 0, "Impuestos y Tasas": 0, "Gastos Financieros": 0, "UT Operativa": 0 },
      { "mes": "Nov", "num": 11, "tipo": "Proyectado", "Ingreso Neto": 0, "Costos de Producción": 0, "Gastos del Personal": 0, "Gastos de Ventas": 0, "Gastos de Ocupación": 0, "Otros Gastos": 0, "Impuestos y Tasas": 0, "Gastos Financieros": 0, "UT Operativa": 0 },
      { "mes": "Dic", "num": 12, "tipo": "Proyectado", "Ingreso Neto": 424522019, "Costos de Producción": 193038700, "Gastos del Personal": 24687399, "Gastos de Ventas": 78543731, "Gastos de Ocupación": 219854478, "Otros Gastos": 57953015, "Impuestos y Tasas": 5065794, "Gastos Financieros": 43627365, "UT Operativa": -420268483 }
    ]
  },
  sucs: ["La Provista", "Pez de Mar Dulce", "Patria", "Pinton", "Porvenir", "Pétalo de Estrellas"]
};

// Formatting helpers
export const MESES_LABEL = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export const EG_CATS = [
  'Costos de Producción',
  'Gastos del Personal',
  'Gastos de Ocupación',
  'Gastos Financieros',
  'Otros Gastos',
  'Gastos de Ventas',
  'Impuestos y Tasas'
] as const;

export type ExpenseCategory = typeof EG_CATS[number];

export const EG_COLORS = ['#1d4ed8', '#7c3aed', '#0891b2', '#d97706', '#059669', '#dc2626', '#9333ea'];

export const EG_MAP = Object.fromEntries(EG_CATS.map((c, i) => [c, EG_COLORS[i]])) as Record<ExpenseCategory, string>;

export const SUC_COLORS: Record<string, string> = {
  'La Provista': '#1d4ed8',
  'Pez de Mar Dulce': '#dc2626',
  'Patria': '#059669',
  'Pinton': '#d97706',
  'Porvenir': '#7c3aed',
  'Pétalo de Estrellas': '#0891b2'
};

// Formats number to millions Gs., e.g., 150000000 -> 150
export const fmt = (v: number) => {
  return Math.round(v / 1e6).toLocaleString('es-PY');
};

// Formats number to billions Gs. with 2 decimals, e.g., 641927540 -> 0.64B
export const fmtB = (v: number) => {
  return (v / 1e9).toFixed(2);
};

// Sums a specific field from array of month records
export function sumField(rows: MonthRecord[], field: keyof Omit<MonthRecord, 'mes' | 'num' | 'tipo'>): number {
  return rows.reduce((acc, r) => acc + (r[field] as number || 0), 0);
}

// Global Filter Logic
export function getFilteredData(
  suc: string,
  fDesde: number,
  fHasta: number,
  fTipo: 'Ambos' | 'Realizado' | 'Proyectado'
): MonthRecord[] {
  const records = RAW.pl_monthly[suc] || [];
  return records.filter(m => {
    const inRange = m.num >= fDesde && m.num <= fHasta;
    const inTipo = fTipo === 'Ambos' || m.tipo === fTipo;
    return inRange && inTipo;
  });
}
