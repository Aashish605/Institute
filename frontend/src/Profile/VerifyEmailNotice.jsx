import { useState } from 'react'
import { motion } from 'motion/react'
import { MailCheck, RefreshCw, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../Components/ui/card'
import { Button } from '../Components/ui/button'
import api from '../config/api'

const VerifyEmailNotice = ({ email, onBack }) => {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [message, setMessage] = useState('')

  const handleResend = async () => {
    setStatus('sending')
    setMessage('')
    try {
      await api.post('/auth/resend-verification', { email })
      setStatus('sent')
      setMessage('A new verification email has been sent. Please check your inbox.')
    } catch {
      setStatus('error')
      setMessage('Failed to resend the email. Please try again later.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md"
    >
      <Card className="border-border/70 bg-white/90 shadow-2xl shadow-slate-200/70 backdrop-blur">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-500">
            <MailCheck className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-primary">Check your inbox</CardTitle>
            <CardDescription className="text-sm text-text-secondary">
              We've sent a verification link to
            </CardDescription>
            <p className="text-sm font-semibold text-text break-all">{email}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700 leading-relaxed">
            Click the link in the email to activate your account. The link expires in <strong>24 hours</strong>. Don't forget to check your spam folder.
          </div>

          {message && (
            <div className={`rounded-xl border px-3 py-2 text-sm ${status === 'sent' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-600'}`}>
              {message}
            </div>
          )}

          <Button
            onClick={handleResend}
            disabled={status === 'sending' || status === 'sent'}
            variant="outline"
            className="w-full gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${status === 'sending' ? 'animate-spin' : ''}`} />
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Email sent!' : 'Resend verification email'}
          </Button>

          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-primary transition mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default VerifyEmailNotice
