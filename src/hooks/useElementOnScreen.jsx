import { useEffect, useMemo, useState ,useContext} from 'react'
import { VideoContext } from '../App';


const useElementOnScreen = (options, targetRef) => {
    const { isAudioMuted, setIsAudioMuted } = useContext(VideoContext);
    const [isVisibile, setIsVisible] = useState()
  
    

    const callbackFunction = entries => {
        const [entry] = entries //const entry = entries[0]
        setIsVisible(entry.isIntersecting)
    }

    const optionsMemo = useMemo(() => {
        return options
    }, [options])

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optionsMemo)
        const currentTarget = targetRef.current
        currentTarget.muted = isAudioMuted
        console.log(isAudioMuted,currentTarget.muted,'muted in hook')
        if (currentTarget) observer.observe(currentTarget)

        return () => {
            if (currentTarget) observer.unobserve(currentTarget)
        }
    }, [targetRef, optionsMemo])

    return isVisibile
}

export default useElementOnScreen 