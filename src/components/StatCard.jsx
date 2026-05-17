export default function StatCard({ label, value, unit, sub }) {
    return (
        <div className="stat-card">
            <span className="stat-label">{label}</span>
            <span className="stat-value">
                {value}
                {unit && <span className="stat-unit"> {unit}</span>}
            </span>
            {sub && <span className="stat-sub">{sub}</span>}
        </div>
    );
}
