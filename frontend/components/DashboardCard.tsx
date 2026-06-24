interface Props {
    title: string;
    value: number;
    color: string;
}

export default function DashboardCard({
    title,
    value,
    color,
}: Props) {

    const colors: Record<string, string> = {
        blue: "bg-blue-50 border-blue-200",
        purple: "bg-purple-50 border-purple-200",
        green: "bg-green-50 border-green-200",
        orange: "bg-orange-50 border-orange-200",
    };

    return (
        <div
            className={`
                rounded-2xl
                border
                p-6
                shadow-sm
                hover:shadow-lg
                transition
                duration-300
                ${colors[color]}
            `}
        >
            <h3 className="text-slate-500 font-medium">
                {title}
            </h3>

            <p className="text-4xl font-bold mt-4 text-slate-800">
                {value}
            </p>
        </div>
    );
}