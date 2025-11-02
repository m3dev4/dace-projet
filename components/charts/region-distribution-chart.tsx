"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RegionDistributionChartProps {
  data: Record<string, number>;
}

export function RegionDistributionChart({ data }: RegionDistributionChartProps) {
  const chartData = Object.entries(data)
    .map(([region, count]) => ({
      region: region.length > 15 ? region.substring(0, 15) + '...' : region,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8); // Top 8 régions

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-zinc-500 dark:text-zinc-400">
        Aucune donnée disponible
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
        <XAxis 
          dataKey="region" 
          tick={{ fill: '#71717a', fontSize: 11 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tick={{ fill: '#71717a', fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e4e4e7',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        />
        <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
