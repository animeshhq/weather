import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import StatCard from "./components/StatCard";
import AqiItem from "./components/AqiItem";
import WindItem from "./components/WindItem";

function App() {
    const [data, setData] = useState({});
    const [city, setCity] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) return;
        fetch(
            `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&aqi=yes`,
        )
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    setError(json.error.message);
                    setData({});
                } else {
                    setError(null);
                    console.log(json);
                    setData(json);
                }
            });
    }, [city]);

    if (!city) {
        return (
            <div className="weather-root">
                <div className="search-card">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Enter city name"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") setCity(e.target.value);
                        }}
                    />
                    <button
                        className="search-btn"
                        onClick={(e) => {
                            const input = e.target.previousSibling;
                            setCity(input.value);
                        }}
                    >
                        Search
                    </button>
                </div>
                <p
                    style={{
                        color: "#aaa",
                        fontSize: 14,
                        textAlign: "center",
                        marginTop: "2rem",
                    }}
                >
                    Enter a city name to get started.
                </p>
                {error && <p className="error-msg">{error}</p>}
            </div>
        );
    }

    if (error) {
        return (
            <div className="weather-root">
                <div className="search-card">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Enter city name"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") setCity(e.target.value);
                        }}
                    />
                    <button
                        className="search-btn"
                        onClick={(e) => {
                            const input = e.target.previousSibling;
                            setCity(input.value);
                        }}
                    >
                        Search
                    </button>
                </div>
                <p className="error-msg">{error}</p>
            </div>
        );
    }

    if (!data.location || !data.current) {
        return (
            <div className="loading">
                {city ? "Loading..." : "Enter a city to get started."}
            </div>
        );
    }

    const { location, current } = data;

    return (
        <div className="weather-root">
            {/* Search */}
            <div className="search-card">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Enter city name"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setCity(e.target.value);
                    }}
                />
                <button
                    className="search-btn"
                    onClick={(e) => {
                        const input = e.target.previousSibling;
                        setCity(input.value);
                    }}
                >
                    Search
                </button>
            </div>
            {/* Hero */}
            <div className="hero">
                <div className="hero-left">
                    <p className="location-name">{location.name}</p>
                    <p className="location-sub">
                        {location.region}, {location.country}
                    </p>
                    <span className="day-badge">
                        {current.is_day ? "☀ Daytime" : "🌙 Nighttime"}
                    </span>
                    <p className="local-time">
                        Local time: {location.localtime}
                    </p>
                </div>
                <div className="hero-right">
                    <div className="temp-main">{current.temp_c}°C</div>
                    <div className="condition-row">
                        <img
                            src={`https:${current.condition.icon}`}
                            width={28}
                            height={28}
                            alt={current.condition.text}
                        />
                        <span className="condition-text">
                            {current.condition.text}
                        </span>
                    </div>
                    <span className="feels-like">
                        Feels like {current.feelslike_c}°C
                    </span>
                </div>
            </div>

            {/* Atmosphere */}
            <p className="section-title">Atmosphere</p>
            <div className="grid-2">
                <StatCard label="Humidity" value={current.humidity} unit="%" />
                <StatCard
                    label="Pressure"
                    value={current.pressure_mb}
                    unit="mb"
                    sub={`${current.pressure_in} in`}
                />
                <StatCard label="Cloud cover" value={current.cloud} unit="%" />
                <StatCard
                    label="Visibility"
                    value={current.vis_km}
                    unit="km"
                    sub={`${current.vis_miles} miles`}
                />
                <StatCard
                    label="Heat index"
                    value={current.heatindex_c}
                    unit="°C"
                    sub={`${current.heatindex_f} °F`}
                />
                <StatCard
                    label="Dew point"
                    value={current.dewpoint_c}
                    unit="°C"
                    sub={`${current.dewpoint_f} °F`}
                />
                <StatCard label="UV index" value={current.uv} />
            </div>

            {/* Wind */}
            <div className="card">
                <p className="section-title">Wind</p>
                <div className="wind-grid">
                    <WindItem
                        label="Speed"
                        value={`${current.wind_kph} kph`}
                        sub={`${current.wind_mph} mph`}
                    />
                    <WindItem
                        label="Direction"
                        value={current.wind_dir}
                        sub={`${current.wind_degree}°`}
                    />
                    <WindItem
                        label="Gust"
                        value={`${current.gust_kph} kph`}
                        sub={`${current.gust_mph} mph`}
                    />
                    <WindItem
                        label="Wind chill"
                        value={`${current.windchill_c}°C`}
                        sub={`${current.windchill_f} °F`}
                    />
                </div>
            </div>

            {/* Precipitation */}
            <div className="row-flex">
                <div className="precip-item">
                    <span className="stat-label">Precipitation</span>
                    <span className="stat-value">
                        {current.precip_mm}
                        <span className="stat-unit"> mm</span>
                    </span>
                    <span className="stat-sub">
                        Rain: {current.chance_of_rain}% chance
                    </span>
                </div>
                <div className="precip-item">
                    <span className="stat-label">Snow</span>
                    <span className="stat-value">
                        {current.chance_of_snow}
                        <span className="stat-unit">% chance</span>
                    </span>
                    <span className="stat-sub">
                        Will it snow: {current.will_it_snow ? "Yes" : "No"}
                    </span>
                </div>
            </div>

            {/* Air Quality */}
            <div className="card">
                <div className="aqi-header">
                    <p className="section-title">Air quality</p>
                    <span className="aqi-badge">
                        US EPA: {current.air_quality["us-epa-index"]} · GB
                        DEFRA: {current.air_quality["gb-defra-index"]}
                    </span>
                </div>
                <div className="aqi-grid">
                    <AqiItem
                        label="CO"
                        value={current.air_quality.co}
                        unit="μg/m³"
                    />
                    <AqiItem
                        label="NO₂"
                        value={current.air_quality.no2}
                        unit="μg/m³"
                    />
                    <AqiItem
                        label="O₃"
                        value={current.air_quality.o3}
                        unit="μg/m³"
                    />
                    <AqiItem
                        label="SO₂"
                        value={current.air_quality.so2}
                        unit="μg/m³"
                    />
                    <AqiItem
                        label="PM 2.5"
                        value={current.air_quality.pm2_5}
                        unit="μg/m³"
                    />
                    <AqiItem
                        label="PM 10"
                        value={current.air_quality.pm10}
                        unit="μg/m³"
                    />
                </div>
            </div>

            {/* Solar Radiation */}
            <div className="card">
                <p className="section-title">Solar radiation</p>
                <div className="wind-grid">
                    <WindItem
                        label="Shortwave"
                        value={`${current.short_rad.toFixed(1)} W/m²`}
                    />
                    <WindItem
                        label="Diffuse"
                        value={`${current.diff_rad.toFixed(1)} W/m²`}
                    />
                    <WindItem
                        label="DNI"
                        value={`${current.dni.toFixed(1)} W/m²`}
                    />
                </div>
            </div>

            <p className="updated">
                Last updated: {current.last_updated} · Coords: {location.lat}°N,{" "}
                {location.lon}°E
            </p>
        </div>
    );
}

export default App;
