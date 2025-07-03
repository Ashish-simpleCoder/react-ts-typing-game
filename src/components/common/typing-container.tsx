import { useEventListener } from 'classic-react-hooks'
import { useActiveWordIndex, useDispatch, useTypingAtom, useWords } from '../../state-atoms/typing.atom'
import Container from '../atoms/container'
import { ElementRef, RefObject, useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

export default function TypingContainer() {
   const activeLetterRef = useRef<ElementRef<'span'>>(null)
   const caretRef = useRef<ElementRef<'div'>>(null)
   const updateTypingAtom = useDispatch()
   const { activeLetterIndex, activeWordIndex, paragraph } = useTypingAtom()
   const words = paragraph.split(' ')
   const [typed_words, setTypedWords] = useState<Map<number, { letters: Array<string> }>>(() => new Map())

   const moveBackwordCaretPosition = () => {
      updateTypingAtom((_atom) => {
         _atom.activeWordIndex += 1
         return { ..._atom }
      })
   }
   const moveForwardCaretPosition = () => {
      updateTypingAtom((_atom) => {
         _atom.activeWordIndex += 1
         return { ..._atom }
      })
   }

   useEventListener(document, 'keydown', (e) => {
      console.log(e.key, e.keyCode)

      if (e.key == 'Backspace') {
         moveBackwordCaretPosition()
      }

      // if space key is pressed
      if (e.keyCode == 32) {
         moveForwardCaretPosition()
      }

      if (e.keyCode >= 65 && e.keyCode <= 90) {
         setTypedWords((_typed_words) => {
            const typed_words = structuredClone(_typed_words)
            typed_words.get(activeLetterIndex)?.letters.push(e.key)

            typed_words.set(activeLetterIndex, {
               letters: typed_words.get(activeLetterIndex)?.letters ?? [],
            })
            return typed_words
         })

         updateTypingAtom((_atom) => {
            _atom.activeLetterIndex += 1
            return { ..._atom }
         })
      }
   })

   useEffect(() => {
      if (caretRef.current && activeLetterRef.current) {
         caretRef.current.style.cssText += `left: ${activeLetterRef.current?.getBoundingClientRect().left - 2 + 16 * activeLetterIndex}px;top: ${activeLetterRef.current?.offsetTop}px;`
      }
   }, [activeWordIndex])

   return (
      <Container className='typing-container mt-10 relative'>
         <div
            ref={caretRef}
            className={cn('text-3xl w-[2px] h-[28px] absolute bg-yellow-400')}
            style={{
               animation: 'caretAnimation 1s linear infinite',
            }}
         ></div>
         <div className='flex flex-row flex-wrap'>
            {words.map((word, idx) => {
               return (
                  <Word
                     key={idx}
                     word={word}
                     isActive={activeWordIndex == idx}
                     activeLetterRef={activeLetterRef}
                     typed_words={typed_words}
                     idx={idx}
                  />
               )
            })}
         </div>
      </Container>
   )
}

function Word({
   word,
   isActive,
   activeLetterRef,
   idx,
   typed_words,
}: {
   word: string
   isActive: boolean
   activeLetterRef: RefObject<ElementRef<'span'>>
   typed_words: any
   idx: number
}) {
   const { activeLetterIndex } = useTypingAtom()

   return (
      <span
         className={cn('mx-2 my-1 text-gray-400', false && 'active text-white font-semibold')}
         {...(isActive && { ref: activeLetterRef })}
      >
         {word.split('').map((letter, idx_lt) => {
            return (
               <span
                  key={idx_lt}
                  className={cn(
                     'text-2xl w-4 text-center inline-block',
                     isActive && idx_lt < activeLetterIndex && 'font-semibold text-white',
                     // typed_words.get(idx)?.letters[idx_lt] == letter && 'correct text-green-500',
                     typed_words.get(idx)?.letters &&
                        typed_words.get(idx).letters[idx_lt] != letter &&
                        'incorrect text-red-500',
                  )}
               >
                  {letter}
               </span>
            )
         })}
      </span>
   )
}
function Caret() {
   const ref = useRef(null)

   return (
      <div
         ref={ref}
         id='caret'
         //  class='full-width default hidden'
         //  style='animation-name: caretFlashSmooth; opacity: 1; font-size: 2rem; display: block; top: 5.5px; left: 8.5px;'
         className='text-3xl w-[2px] h-4 absolute bg-yellow-400'
         style={{ animation: 'caretAnimation 1s linear infinite' }}
      ></div>
   )
}
