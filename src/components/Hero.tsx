import { Link } from "react-router-dom";
import Button from "@components/Button";
import Container from "./Container";

type Props = {
  content: string;
  route: { path: string; label: string };
};

function Hero({ content, route }: Props) {
  return (
    <div className="h-[calc(100vh_-_3.5rem)] bg-hero bg-center object-cover">
      <Container className="flex h-full flex-col items-end justify-center">
        <div className="flex max-w-md flex-col items-center justify-center gap-12">
          <h1 className="whitespace-break-spaces text-center font-heading text-5xl font-black uppercase text-neutral-50 [text-shadow:_0px_4px_4px_rgba(0,_0,_0,_0.25)]">
            {content}
          </h1>
          <Button
            component={Link}
            to={route.path}
            variant="outlined"
            className="text-xl"
          >
            {route.label}
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
