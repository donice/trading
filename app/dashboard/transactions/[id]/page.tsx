import { TransactionDetail } from "./_components";

export default function TransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto py-8">
      <TransactionDetail transactionId={params.id} />
    </div>
  );
}