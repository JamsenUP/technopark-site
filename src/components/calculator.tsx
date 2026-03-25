"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Input } from "./ui";

const calculatorSchema = z.object({
  wasteType: z.enum(["construction", "household", "bulky", "snow"]),
  containerType: z.enum(["volume", "container"]),
  volume: z.number().min(1).max(60).optional(),
  containerSize: z.enum(["8", "20", "27", "puh"]).optional(),
  address: z.string().min(5, "Укажите адрес полностью"),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

const baseRates: Record<CalculatorFormValues["wasteType"], number> = {
  construction: 2200,
  household: 1800,
  bulky: 2500,
  snow: 1900,
};

const containerMultipliers: Record<string, number> = {
  "8": 1,
  "20": 2.1,
  "27": 2.7,
  puh: 0.6,
};

export type CalculatorCopy = {
  eyebrow: string;
  title: string;
  wasteTypeLabel: string;
  wasteTypeConstruction: string;
  wasteTypeHousehold: string;
  wasteTypeBulky: string;
  wasteTypeSnow: string;
  calculationLabel: string;
  calculationByVolume: string;
  calculationByContainer: string;
  volumeLabel: string;
  volumeRangeLabel: string;
  addressLabel: string;
  addressPlaceholder: string;
  submitLabel: string;
  consentText: string;
  resultEyebrow: string;
  resultEmptyValue: string;
  resultHint: string;
  orderCta: string;
  orderHint: string;
};

const defaultCopy: CalculatorCopy = {
  eyebrow: "Онлайн-калькулятор",
  title: "Рассчитайте стоимость утилизации онлайн за 1 минуту",
  wasteTypeLabel: "Тип отходов",
  wasteTypeConstruction: "Строительный",
  wasteTypeHousehold: "Бытовой",
  wasteTypeBulky: "Крупногабарит",
  wasteTypeSnow: "Снег",
  calculationLabel: "Расчет по",
  calculationByVolume: "По объему, м³",
  calculationByContainer: "По контейнеру",
  volumeLabel: "Объем, м³",
  volumeRangeLabel: "1–60 м³",
  addressLabel: "Адрес утилизации",
  addressPlaceholder: "Город, улица, дом, объект",
  submitLabel: "Рассчитать стоимость",
  consentText: "Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.",
  resultEyebrow: "Результат расчета",
  resultEmptyValue: "—",
  resultHint:
    "Итоговая стоимость зависит от удаленности объекта, сложности подъезда и графика работ. Точный расчет менеджер подтвердит по телефону.",
  orderCta: "Заказать по этой цене",
  orderHint:
    "Отправьте заявку — мы перезвоним в течение 10 минут, подтвердим стоимость и подберем технику.",
};

export function PriceCalculator({ copy }: { copy?: Partial<CalculatorCopy> }) {
  const c = { ...defaultCopy, ...(copy ?? {}) };
  const [price, setPrice] = useState<number | null>(null);

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      wasteType: "construction",
      containerType: "volume",
      volume: 8,
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const containerType = form.getValues("containerType");

  const onSubmit = (data: CalculatorFormValues) => {
    const base = baseRates[data.wasteType];

    let total = base;

    if (data.containerType === "volume" && data.volume) {
      total = base * (data.volume / 8);
    }

    if (data.containerType === "container" && data.containerSize) {
      total = base * (containerMultipliers[data.containerSize] ?? 1);
    }

    setPrice(Math.round(total / 10) * 10);
  };

  return (
    <Card className="grid gap-6 md:grid-cols-[1.4fr,1fr]">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
            {c.eyebrow}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-50">
            {c.title}
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-200">
              {c.wasteTypeLabel}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-200 peer-checked:border-[#0A2472] peer-checked:bg-white peer-checked:text-[#0A2472]">
                <input
                  type="radio"
                  value="construction"
                  {...register("wasteType")}
                  className="peer hidden"
                />
                <span>{c.wasteTypeConstruction}</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-200 peer-checked:border-[#0A2472] peer-checked:bg-white peer-checked:text-[#0A2472]">
                <input
                  type="radio"
                  value="household"
                  {...register("wasteType")}
                  className="peer hidden"
                />
                <span>{c.wasteTypeHousehold}</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-200 peer-checked:border-[#0A2472] peer-checked:bg-white peer-checked:text-[#0A2472]">
                <input
                  type="radio"
                  value="bulky"
                  {...register("wasteType")}
                  className="peer hidden"
                />
                <span>{c.wasteTypeBulky}</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-200 peer-checked:border-[#0A2472] peer-checked:bg-white peer-checked:text-[#0A2472]">
                <input
                  type="radio"
                  value="snow"
                  {...register("wasteType")}
                  className="peer hidden"
                />
                <span>{c.wasteTypeSnow}</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-200">
              {c.calculationLabel}
            </span>
            <div className="flex gap-2 text-xs sm:text-sm">
              <label className="flex-1 cursor-pointer rounded-2xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-center text-slate-200 peer-checked:border-[#0A2472] peer-checked:bg-white peer-checked:text-[#0A2472]">
                <input
                  type="radio"
                  value="volume"
                  {...register("containerType")}
                  className="peer hidden"
                />
                {c.calculationByVolume}
              </label>
              <label className="flex-1 cursor-pointer rounded-2xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-center text-slate-200 peer-checked:border-[#0A2472] peer-checked:bg-white peer-checked:text-[#0A2472]">
                <input
                  type="radio"
                  value="container"
                  {...register("containerType")}
                  className="peer hidden"
                />
                {c.calculationByContainer}
              </label>
            </div>
          </div>
        </div>

        {containerType === "volume" ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{c.volumeLabel}</span>
              <span>{c.volumeRangeLabel}</span>
            </div>
            <input
              type="range"
              min={1}
              max={60}
              step={1}
              className="w-full accent-primary"
              {...register("volume", { valueAsNumber: true })}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Тип контейнера
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-200">
                <span>8 м³</span>
                <input
                  type="radio"
                  value="8"
                  {...register("containerSize")}
                  className="accent-primary"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-200">
                <span>20 м³</span>
                <input
                  type="radio"
                  value="20"
                  {...register("containerSize")}
                  className="accent-primary"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-200">
                <span>27 м³</span>
                <input
                  type="radio"
                  value="27"
                  {...register("containerSize")}
                  className="accent-primary"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-200">
                <span>ПУХТО</span>
                <input
                  type="radio"
                  value="puh"
                  {...register("containerSize")}
                  className="accent-primary"
                />
              </label>
            </div>
          </div>
        )}

        <Input
          label={c.addressLabel}
          placeholder={c.addressPlaceholder}
          {...register("address")}
          error={errors.address?.message}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-slate-700/80 bg-white px-3 py-2 text-xs font-medium text-[#0A2472] transition-colors hover:bg-[#7f8c8d] hover:text-white sm:w-auto"
          >
            {c.submitLabel}
          </button>
          <p className="text-xs text-slate-500">
            {c.consentText}
          </p>
        </div>
      </form>

      <div className="flex flex-col justify-between gap-4 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 p-5 sm:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            {c.resultEyebrow}
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {price ? `${price.toLocaleString("ru-RU")} ₽` : c.resultEmptyValue}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {c.resultHint}
          </p>
        </div>

        <div className="space-y-2">
          <button
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-slate-700/80 bg-white px-3 py-2 text-xs font-medium text-[#0A2472] transition-colors hover:bg-[#7f8c8d] hover:text-white"
            type="button"
            data-open-order
          >
            {c.orderCta}
          </button>
          <p className="text-xs text-slate-500">
            {c.orderHint}
          </p>
        </div>
      </div>
    </Card>
  );
}

