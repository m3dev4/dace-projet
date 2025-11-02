"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PostesDistributionChartProps {
  postesContact: number | null;
  postesDistants: number | null;
}

export function PostesDistributionChart({ postesContact, postesDistants }: PostesDistributionChartProps) {
  if (!postesContact && !postesDistants) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-zinc-500 dark:text-zinc-400">
        Données insuffisantes
      </div>
    );
  }

  const data = [
    { name: 'Postes Contact', value: postesContact || 0, color: '#3b82f6' },
    { name: 'Postes Distants', value: postesDistants || 0, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e4e4e7',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        />
        <Legend 
          wrapperStyle={{ fontSize: '12px' }}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
