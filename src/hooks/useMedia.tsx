import React from 'react'

export const useMedia = (media: string) => {
  const [match, setMatch] = React.useState(() => {
    const { matches } = window.matchMedia(media)
    return matches
  })

  React.useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media)
      setMatch(matches)
    }

    window.addEventListener('resize', changeMatch)

    return () => {
      window.removeEventListener('resize', changeMatch)
    }
  }, [media])  

  return match
}
