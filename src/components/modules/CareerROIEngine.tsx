import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building, 
  Sparkles, 
  Briefcase, 
  ArrowUpRight, 
  GraduationCap, 
  Award,
  Calendar,
  CheckCircle2,
  BarChart3
} from 'lucide-react';
import { roiBenchmarkData } from '../../data/mockData';

interface CareerROIEngineProps {
  onNavigateToView: (view: string) => void;
}

export const CareerROIEngine: React.FC<CareerROIEngineProps> = ({ onNavigateToView }) => {
  const [selectedCohortYear, setSelectedCohortYear] = useState<'all' | '2024' | '2025'>('all');

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
                Module 3 Engine
              </span>
              <span className="text-xs text-google-gray-500">
                Empirical Labor Economics & Alumni Graph
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-google-gray-900 mt-1">
              Data-Driven ROI & Career Benchmarking Engine
            </h1>
            <p className="text-xs md:text-sm text-google-gray-600 mt-1">
              Financial telemetry mapped from 1,480+ verified Georgia Tech Scheller MBA alumni records cross-referenced with live Google Careers and Jobs.com market compensation feeds.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-google-gray-600">Cohort Sample:</span>
            <span className="text-xs font-bold text-google-gray-900 bg-google-gray-100 px-3 py-1.5 rounded-lg border border-google-gray-200">
              1,480 Verified Alumni
            </span>
          </div>
        </div>
      </div>

      {/* HARD FINANCIAL ROI CALLOUT TILES (including $500k+ cohort highlight) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* $500k+ Metric Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                High-Earner Cohort
              </span>
              <Sparkles className="w-4 h-4 text-emerald-200" />
            </div>

            <div className="text-3xl md:text-4xl font-extrabold my-2 tracking-tight">
              {roiBenchmarkData.topEarnerPercentage}
            </div>

            <h3 className="text-sm font-semibold text-emerald-100 leading-snug">
              of professionals with this exact course combination earn <strong>{roiBenchmarkData.thresholdTC}</strong> per year
            </h3>
          </div>

          <div className="pt-4 mt-4 border-t border-white/20 text-xs text-emerald-100">
            Based on GT MBA Core + Decision AI + Google Cloud Architect within 4 years of graduation.
          </div>
        </div>

        {/* Median Salary Uplift Tile */}
        <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm hover:shadow-google-hover transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-google-blue px-2 py-0.5 rounded">
                Median Uplift Premium
              </span>
              <TrendingUp className="w-5 h-5 text-google-blue" />
            </div>

            <div className="text-3xl md:text-4xl font-extrabold text-google-gray-900 my-2">
              {roiBenchmarkData.medianUplift}
            </div>

            <h3 className="text-sm font-semibold text-google-gray-700">
              Annual compensation delta over non-certified MBA peers
            </h3>
          </div>

          <div className="pt-4 mt-4 border-t border-google-gray-100 text-xs text-google-gray-600">
            Standard MBA Median: <strong>$170k</strong> → Supercharged Cloud Median: <strong>$255k</strong>
          </div>
        </div>

        {/* Median 5-Year TC Target */}
        <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm hover:shadow-google-hover transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                Year 5 Median TC
              </span>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>

            <div className="text-3xl md:text-4xl font-extrabold text-google-gray-900 my-2">
              $515,000
            </div>

            <h3 className="text-sm font-semibold text-google-gray-700">
              Median Total Compensation at Director / Principal Tier
            </h3>
          </div>

          <div className="pt-4 mt-4 border-t border-google-gray-100 text-xs text-google-gray-600">
            Composition: $280k Base + $185k RSU/Equity + $50k Annual Bonus
          </div>
        </div>

      </div>

      {/* Compensation Percentile Distribution Curve */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-google-gray-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-google-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 text-google-blue mr-2" />
              Total Compensation (TC) Percentile Distribution Curve
            </h3>
            <p className="text-xs text-google-gray-600">
              For Georgia Tech MBA graduates holding dual business & cloud-architecture credentials:
            </p>
          </div>
          <span className="text-xs text-google-gray-500">
            Source: Jobs.com Verified W2 Telemetry & Survey Benchmarks
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="border border-google-gray-200 rounded-xl p-4 text-center bg-google-gray-50">
            <span className="text-xs font-bold text-google-gray-500 uppercase">25th Percentile</span>
            <div className="text-xl font-bold text-google-gray-800 mt-1">
              {roiBenchmarkData.percentiles.p25}
            </div>
            <p className="text-[11px] text-google-gray-500 mt-0.5">Entry Post-Graduation</p>
          </div>

          <div className="border border-blue-200 rounded-xl p-4 text-center bg-blue-50/50">
            <span className="text-xs font-bold text-google-blue uppercase">50th Percentile (Median)</span>
            <div className="text-xl font-bold text-google-blue mt-1">
              {roiBenchmarkData.percentiles.p50}
            </div>
            <p className="text-[11px] text-google-gray-600 mt-0.5">3-Year Mid-Career Level</p>
          </div>

          <div className="border border-emerald-200 rounded-xl p-4 text-center bg-emerald-50/50">
            <span className="text-xs font-bold text-emerald-700 uppercase">75th Percentile</span>
            <div className="text-xl font-bold text-emerald-800 mt-1">
              {roiBenchmarkData.percentiles.p75}
            </div>
            <p className="text-[11px] text-google-gray-600 mt-0.5">Senior Staff Tier</p>
          </div>

          <div className="border border-purple-200 rounded-xl p-4 text-center bg-purple-50/50">
            <span className="text-xs font-bold text-purple-700 uppercase">90th Percentile</span>
            <div className="text-xl font-bold text-purple-900 mt-1">
              {roiBenchmarkData.percentiles.p90}
            </div>
            <p className="text-[11px] text-purple-700 font-semibold mt-0.5">Executive & Principal</p>
          </div>
        </div>
      </div>

      {/* HISTORICAL ALUMNI CAREER PROGRESSION TRAJECTORY */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-google-gray-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-amber-700" />
              <h2 className="text-lg font-bold text-google-gray-900">
                Historical Georgia Tech Alumni Career Progression (5-Year Trajectory)
              </h2>
            </div>
            <p className="text-xs text-google-gray-600 mt-0.5">
              Empirical career stages tracked across verified alumni who completed this academic + cloud certification sequence.
            </p>
          </div>

          <button 
            onClick={() => onNavigateToView('stackable')}
            className="px-3.5 py-1.5 bg-google-blue text-white text-xs font-semibold rounded-lg hover:bg-google-blue-hover transition-colors flex items-center space-x-1"
          >
            <span>Match Your Profile</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Timeline */}
        <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-google-blue/30">
          {roiBenchmarkData.progressionTimeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Stepper dot */}
              <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-white border-4 border-google-blue group-hover:scale-110 transition-transform flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-google-blue"></div>
              </div>

              <div className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-5 hover:bg-white hover:border-google-blue transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-bold text-google-blue bg-blue-50 px-2 py-0.5 rounded">
                      {item.yearsPostGrad}
                    </span>
                    <h4 className="text-sm font-bold text-google-gray-900 mt-1">
                      {item.stage}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-emerald-700">
                      {item.medianTC}
                    </span>
                    <p className="text-[10px] text-google-gray-500">Median Cohort Compensation</p>
                  </div>
                </div>

                {/* Typical Titles */}
                <div className="mb-3">
                  <span className="text-[11px] font-semibold text-google-gray-600 uppercase">
                    Common Verified Titles:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.typicalTitles.map((title, i) => (
                      <span key={i} className="px-2.5 py-0.5 bg-white border border-google-gray-200 text-google-gray-800 text-xs rounded-md shadow-2xs font-medium">
                        💼 {title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Employing Organizations */}
                <div className="pt-2 border-t border-google-gray-200 flex items-center justify-between text-xs text-google-gray-600">
                  <div className="flex items-center space-x-2">
                    <Building className="w-3.5 h-3.5 text-google-gray-500" />
                    <span>Top Hiring Employers:</span>
                    <strong className="text-google-gray-900">{item.topCompanies.join(', ')}</strong>
                  </div>
                  <span className="text-emerald-700 font-semibold text-[11px] flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified Alumni Signal
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
