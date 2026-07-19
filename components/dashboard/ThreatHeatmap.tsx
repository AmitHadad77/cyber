const regions = [
  {
    name: "North America",
    risk: 18,
    level: "Low",
    incidents: 12,
  },
  {
    name: "Europe",
    risk: 32,
    level: "Medium",
    incidents: 24,
  },
  {
    name: "Middle East",
    risk: 11,
    level: "Low",
    incidents: 8,
  },
  {
    name: "Asia Pacific",
    risk: 57,
    level: "High",
    incidents: 41,
  },
];

export default function ThreatHeatmap() {
  return (
    <section
      className="threatHeatmap"
      aria-labelledby="threat-heatmap-title"
    >
      <div className="threatHeatmap__header">
        <div>
          <span>GLOBAL RISK</span>
          <h4 id="threat-heatmap-title">Threat exposure by region</h4>
        </div>

        <div className="threatHeatmap__status">
          <i aria-hidden="true" />
          LIVE
        </div>
      </div>

      <div className="threatHeatmap__regions">
        {regions.map((region) => (
          <article
            className={`threatHeatmap__region is-${region.level.toLowerCase()}`}
            key={region.name}
          >
            <div className="threatHeatmap__regionTop">
              <div>
                <strong>{region.name}</strong>
                <span>{region.incidents} signals detected</span>
              </div>

              <span className="threatHeatmap__level">
                {region.level}
              </span>
            </div>

            <div className="threatHeatmap__track">
              <span style={{ width: `${region.risk}%` }} />
            </div>

            <div className="threatHeatmap__regionBottom">
              <strong>{region.risk}%</strong>
              <span>Exposure score</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}