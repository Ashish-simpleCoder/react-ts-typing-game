import { atom, useAtom, useAtomValue } from 'jotai'

export const TypingAtom = atom({
   paragraph: 'this is a random collection of the text. So you can do whatever you like.this is a random collection of the text. So you can do whatever you like.this is a random collection of the text. So you can do whatever you like.this is a random collection of the text. So you can do whatever you like.',
   activeWordIndex: 0,
   activeLetterIndex: 0
})

export const useActiveWordIndex = () => useAtomValue(TypingAtom).activeWordIndex
export const useWords = () => useAtomValue(TypingAtom).paragraph.split(' ')
export const useDispatch = () => useAtom(TypingAtom)[1]

export const useTypingAtom = () => useAtomValue(TypingAtom)