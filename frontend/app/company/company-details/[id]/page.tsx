export default async function ComapnyDetailsPageDynamic({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <div>
      dynamic {id}
    </div>
  );
}
