export default function WindItem({ label, value, sub }) {
    return (
        <div className="wind-item">
            <span className="wind-label">{label}</span>
            <span className="wind-val">{value}</span>
            {sub && <span className="stat-sub">{sub}</span>}
        </div>
    );
}
