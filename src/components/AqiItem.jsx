export default function AqiItem({ label, value, unit }) {
    return (
        <div className="aqi-item">
            <span className="aqi-label">{label}</span>
            <span className="aqi-val">
                {value}
                {unit && <span className="stat-unit"> {unit}</span>}
            </span>
        </div>
    );
}
