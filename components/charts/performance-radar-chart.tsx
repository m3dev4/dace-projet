"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

interface PerformanceRadarChartProps {
  scores: {
    Capacité?: number;
    Occupation?: number;
    Infrastructure?: number;
    Conformité?: number;
    Flux?: number;
  };
}

export function PerformanceRadarChart({ scores }: PerformanceRadarChartProps) {
  const data = [
    { subject: 'Capacité', value: scores.Capacité || 0, fullMark: 100 },
    { subject: 'Occupation', value: scores.Occupation || 0, fullMark: 100 },
    { subject: 'Infrastructure', value: scores.Infrastructure || 0, fullMark: 100 },
    { subject: 'Conformité', value: scores.Conformité || 0, fullMark: 100 },
    { subject: 'Flux', value: scores.Flux || 50, fullMark: 100 }, // Par défaut 50 si non fourni
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e4e4e7" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#71717a', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]}
          tick={{ fill: '#71717a', fontSize: 10 }}
        />
        <Radar 
          name="Performance" 
          dataKey="value" 
          stroke="#3b82f6" 
          fill="#3b82f6" 
          fillOpacity={0.6}
        />
        <Legend 
          wrapperStyle={{ fontSize: '12px' }}
          iconType="circle"
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
