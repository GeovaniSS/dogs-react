interface ErrorProps {
  error: string
}

export const Error = ({ error }: ErrorProps) => {
  if (!error) return null 
  return (
    <p style={{ color: '#f31', margin: '1rem 0' }}>
      {error}
    </p>
  )
}
