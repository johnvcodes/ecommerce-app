import { TFeature } from "../@types/feature";

type Props = {
  feature: TFeature;
};

function FeatureCard({ feature }: Props) {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      {feature.icon}
      <div className="flex flex-col gap-2">
        <h6 className="font-extrabold">{feature.title}</h6>
        <p>{feature.description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
