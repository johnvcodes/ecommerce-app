import { Link } from "react-router-dom";

type Props = {
  title: string;
  items: string[];
};

function FooterList({ title, items }: Props) {
  return (
    <section className="flex flex-col gap-6">
      <h6 className="font-extrabold">{title}</h6>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item}>
            <Link to="/">{item}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FooterList;
