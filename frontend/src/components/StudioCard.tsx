export default function StudioCard({ data }: { data: any }) {
  return (
    <div className="bg-[#111] p-4 rounded-xl shadow">
      {data.imageURL && (
        <img
          src={data.imageURL}
          alt="thumb"
          className="rounded mb-3 w-full h-40 object-cover"
        />
      )}

      <h2 className="text-lg font-bold">{data.title}</h2>
      <p className="text-sm text-gray-400">{data.description}</p>
    </div>
  );
}
