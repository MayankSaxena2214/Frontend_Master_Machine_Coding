import React from 'react'
import { cn } from '@/lib/utils'
import { Check, X, AlertTriangle, Info } from 'lucide-react'
import './NotificationCard.css'

/* ----------------------------------
   Notification Theme Configuration
-----------------------------------*/
const NOTIFICATION_THEME = {
  success: {
    bg: 'bg-green-600',
    border: 'border-green-600',
    icon: Check,
  },
  error: {
    bg: 'bg-red-600',
    border: 'border-red-600',
    icon: AlertTriangle,
  },
  danger: {
    bg: 'bg-red-600',
    border: 'border-red-600',
    icon: AlertTriangle,
  },
  alert: {
    bg: 'bg-yellow-600',
    border: 'border-yellow-600',
    icon: AlertTriangle,
  },
  info: {
    bg: 'bg-blue-600',
    border: 'border-blue-600',
    icon: Info,
  },
}

/* ----------------------------------
   Component
-----------------------------------*/
const NotificationCard = ({
  id,
  title = '',
  description = '',
  type = 'error',
  cta = null,
  progress = 100,
  exiting = false,
  onRemove,
  updateToasts = () => {},
  handlePauseNotification = () => {},
  handleResumeProgressNotification = () => {},
}) => {
  const theme = NOTIFICATION_THEME[type] || NOTIFICATION_THEME.info
  const Icon = theme.icon

  const handleRemove = () => {
    updateToasts(id)
  }

  return (
    <div
      onMouseEnter={() => handlePauseNotification(id)}
      onMouseLeave={() => handleResumeProgressNotification(id)}
      onAnimationEnd={exiting ? onRemove : undefined}
      className={cn(
        'relative overflow-hidden rounded-lg border px-6 py-4 bg-white shadow-sm',
        exiting && 'exiting-toast'
      )}
    >
      {/* Close button */}
      {onRemove && (
        <button
          onClick={handleRemove}
          className="absolute right-2 top-2 rounded-full p-1 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Content */}
      <div className="flex items-start gap-3 pr-6">
        {/* Icon */}
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-white',
            theme.bg
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1">
          <div className="text-base font-semibold">{title}</div>
          {description && (
            <div className="text-sm text-gray-600">{description}</div>
          )}
          {cta && <div className="mt-1">{cta}</div>}
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{ width: `${progress}%` }}
        className={cn(
          'absolute bottom-0 left-0 h-1 transition-all duration-100 linear',
          theme.bg
        )}
      />
    </div>
  )
}

export default NotificationCard
