import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { priceFormatter } from "@/utils/price-formatter";

interface CardTransactionProps extends React.PropsWithChildren {
  value?: number;
}

export function CardTransaction({ children, value }: CardTransactionProps) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center font-normal gap-4 text-lg">{children}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{priceFormatter.format(value ?? 0)}</p>
      </CardContent>
    </Card>
  );
}
