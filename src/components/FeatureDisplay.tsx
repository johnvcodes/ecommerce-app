import { Headphones, Tag, Truck, Undo2 } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { TFeature } from "../@types/feature";

const features: TFeature[] = [
  {
    icon: <Tag size={24} strokeWidth={2} className="shrink-0 text-primary" />,
    title: "Preços Imbatíveis",
    description: "Roupas de ótima qualidade e preço somente aqui",
  },
  {
    icon: <Truck size={24} strokeWidth={2} className="shrink-0 text-primary" />,
    title: "Frete Grátis",
    description: "Aproveite frete grátis para compras acima de R$100,00",
  },
  {
    icon: (
      <Headphones size={24} strokeWidth={2} className="shrink-0 text-primary" />
    ),
    title: "Atendimento ao cliente",
    description:
      "Nosso serviço de atendimento ao cliente funciona o dia todo, todos os dias",
  },
  {
    icon: <Undo2 size={24} strokeWidth={2} className="shrink-0 text-primary" />,
    title: "30 dias para devolução",
    description: "Período de 30 dias para devolver itens",
  },
];

function FeatureDisplay() {
  return (
    <div className="bg-neutral-50 py-4">
      <section className="container mx-auto grid auto-rows-fr gap-4 px-6 py-4 sm:grid-cols-2 md:px-0 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </section>
    </div>
  );
}

export default FeatureDisplay;
