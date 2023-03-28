type Status = {
  status: string;
};

const Badge = ({ status }: Status) => {
  const bgColor = status === "In Holiday" ? "bg-orange-400" : "bg-green-100";
  const textColor =
    status === "In Holiday" ? "text-orange-800" : "text-green-800";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};

export default Badge;
