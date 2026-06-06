import { useGetSummaryQuery } from '../store/apis/transactionApi';

// Palete ngjyrash per kategorite (ciklohet nese ka me shume kategori se ngjyra)
const COLORS = ['#E24B4A', '#378ADD', '#1D9E75', '#EF9F27', '#7F77DD', '#D4537E', '#639922', '#888780'];

const formatCurrency = (value) =>
    new Intl.NumberFormat('sq-AL', { maximumFractionDigits: 0 }).format(value || 0) + ' L';

// Llogarit koordinatat e nje pike ne rreth (per te vizatuar segmentet e donut-it)
const polarToCartesian = (cx, cy, r, angle) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

// Krijon path-in SVG per nje segment harku
const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
};

const CategoryChart = () => {
    const { data: summary } = useGetSummaryQuery();

    const byCategory = summary?.byCategory || {};
    const entries = Object.entries(byCategory).filter(([, val]) => val > 0);
    const total = entries.reduce((sum, [, val]) => sum + val, 0);

    // Nese nuk ka ende shpenzime, nuk e shfaqim grafikun
    if (entries.length === 0) {
        return null;
    }

    const cx = 100;
    const cy = 100;
    const radius = 80;
    let currentAngle = 0;

    // Ndertojme segmentet e grafikut
    const segments = entries.map(([category, value], index) => {
        const portion = value / total;
        const startAngle = currentAngle;
        const endAngle = currentAngle + portion * 360;
        currentAngle = endAngle;
        return {
            category,
            value,
            percent: Math.round(portion * 100),
            color: COLORS[index % COLORS.length],
            // Nese eshte nje kategori e vetme (360°), vizatojme rreth te plote me circle
            path: portion >= 0.9999 ? null : describeArc(cx, cy, radius, startAngle, endAngle),
        };
    });

    return (
        <div className='chart-section'>
            <h3>Shpenzimet sipas kategorive</h3>
            <div className='chart-wrapper'>
                <svg viewBox='0 0 200 200' className='chart-svg' role='img' aria-label='Grafiku i shpenzimeve sipas kategorive'>
                    {segments.map((seg, i) =>
                        seg.path === null ? (
                            <circle
                                key={i}
                                cx={cx}
                                cy={cy}
                                r={radius}
                                fill='none'
                                stroke={seg.color}
                                strokeWidth='28'
                            />
                        ) : (
                            <path
                                key={i}
                                d={seg.path}
                                fill='none'
                                stroke={seg.color}
                                strokeWidth='28'
                            />
                        )
                    )}
                    {/* Teksti ne qender: totali i shpenzimeve */}
                    <text x={cx} y={cy - 4} textAnchor='middle' className='chart-center-label'>Total</text>
                    <text x={cx} y={cy + 16} textAnchor='middle' className='chart-center-value'>
                        {formatCurrency(total)}
                    </text>
                </svg>

                <ul className='chart-legend'>
                    {segments.map((seg, i) => (
                        <li key={i}>
                            <span className='legend-color' style={{ backgroundColor: seg.color }} />
                            <span className='legend-label'>{seg.category}</span>
                            <span className='legend-value'>{formatCurrency(seg.value)} ({seg.percent}%)</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default CategoryChart;
