import { useEffect, useState } from 'react'
import { useScanStore } from '../store/scanStore'
import { Ruler, Download, RotateCcw, Share2, CheckCircle, AlertTriangle } from 'lucide-react'

// Mock measurements for demo
const MOCK_MEASUREMENTS = [
  { name: 'Chest', value: 102.5, unit: 'cm', confidence: 0.92, grade: 'P0' as const },
  { name: 'Waist', value: 88.3, unit: 'cm', confidence: 0.89, grade: 'P0' as const },
  { name: 'Hip', value: 98.7, unit: 'cm', confidence: 0.91, grade: 'P0' as const },
  { name: 'Shoulder', value: 46.2, unit: 'cm', confidence: 0.94, grade: 'P0' as const },
  { name: 'Arm Length', value: 64.8, unit: 'cm', confidence: 0.88, grade: 'P0' as const },
  { name: 'Back Length', value: 48.5, unit: 'cm', confidence: 0.90, grade: 'P0' as const },
  { name: 'Neck', value: 39.4, unit: 'cm', confidence: 0.93, grade: 'P0' as const },
  { name: 'Bicep', value: 32.1, unit: 'cm', confidence: 0.85, grade: 'P1' as const },
  { name: 'Wrist', value: 17.8, unit: 'cm', confidence: 0.87, grade: 'P1' as const },
  { name: 'Inseam', value: 82.4, unit: 'cm', confidence: 0.86, grade: 'P1' as const },
]

export default function ResultsScreen() {
  const [showConfidences, setShowConfidences] = useState(false)
  const { 
    measurements, 
    setMeasurements, 
    setStep, 
    reset,
    calibration 
  } = useScanStore()

  // Load measurements on mount
  useEffect(() => {
    if (measurements.length === 0) {
      setMeasurements(MOCK_MEASUREMENTS)
    }
  }, [measurements, setMeasurements])

  const handleNewScan = () => {
    reset()
    setStep('welcome')
  }

  const overallConfidence = measurements.length > 0
    ? measurements.reduce((acc, m) => acc + m.confidence, 0) / measurements.length
    : 0

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-eyeson-surface border-b border-slate-700 p-4 safe-area-top">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Your Measurements</h1>
            <p className="text-sm text-slate-400">
              {measurements.length} measurements captured
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-eyeson-accent">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {Math.round(overallConfidence * 100)}% confidence
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Scale: {calibration?.scaleFactor.toFixed(4) || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Measurements List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-3">
          {measurements.map((measurement, index) => (
            <MeasurementCard
              key={index}
              measurement={measurement}
              showConfidence={showConfidences}
            />
          ))}
        </div>

        {/* 3D Preview Placeholder */}
        <div className="mt-6 bg-eyeson-surface rounded-xl p-4 border border-slate-700">
          <h3 className="font-semibold text-white mb-3">3D Body Model</h3>
          <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-2 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center">
                <Ruler className="w-12 h-12 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400">3D viewer coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-eyeson-surface border-t border-slate-700 p-4 safe-area-bottom">
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={showConfidences}
              onChange={(e) => setShowConfidences(e.target.checked)}
              className="rounded border-slate-600 bg-slate-800 text-primary-500"
            />
            Show confidence scores
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {}}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => {}}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        <button
          onClick={handleNewScan}
          className="btn-primary w-full mt-3 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          New Scan
        </button>
      </div>
    </div>
  )
}

function MeasurementCard({
  measurement,
  showConfidence,
}: {
  measurement: {
    name: string
    value: number
    unit: string
    confidence: number
    grade: 'P0' | 'P1'
  }
  showConfidence: boolean
}) {
  const confidenceColor = measurement.confidence >= 0.9 
    ? 'bg-green-500' 
    : measurement.confidence >= 0.75 
      ? 'bg-yellow-500' 
      : 'bg-red-500'

  return (
    <div className="bg-eyeson-surface rounded-xl p-4 border border-slate-700 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${confidenceColor}`} />
        <div>
          <h3 className="font-medium text-white">{measurement.name}</h3>
          {showConfidence && (
            <p className="text-xs text-slate-400">
              Confidence: {Math.round(measurement.confidence * 100)}%
              {' '}• {measurement.grade}
            </p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-white">
          {measurement.value.toFixed(1)}
          <span className="text-sm text-slate-400 ml-1">{measurement.unit}</span>
        </p>
      </div>
    </div>
  )
}
