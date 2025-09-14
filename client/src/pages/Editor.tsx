import PortfolioEditor from "@/components/PortfolioEditor";
import { useParams } from "wouter";

export default function Editor() {
  const { id } = useParams<{ id?: string }>();
  return <PortfolioEditor portfolioId={id} />;
}