import { Row } from './Row';
import { Player } from '../lib/player'
import { useMediaQuery } from 'react-responsive'
import { useState } from 'react';

interface Props {
  players: Player[]
}

const LABEL_TO_PROP = new Map([["Rank", "colley_rank"], ["Strength of schedule", "colley_strength_of_schedule_rank"]])

export function Table({ players }: Props) {
  const [sortCol, setSortCol] = useState("colley_rank")
  const [sortDescending, setSortDescending] = useState(true)
  const isSm = useMediaQuery({ query: '(min-width: 640px)' })
  const sortedPlayers = [...players].sort((a, b) => { 
    return sortDescending ?
    a[sortCol] - b[sortCol] : 
    b[sortCol] - a[sortCol]
  }) as Player[]

  const updateSort = (label: string) => {
    const sortProp = LABEL_TO_PROP.get(label)
    if(!sortProp) {
      return
    }
    if(sortProp === sortCol) {
      setSortDescending(!sortDescending)
      return
    }
    setSortCol(sortProp)
    setSortDescending(true)
  }

  const th = (text, width) => {
    return <div className={`flex items-center justify-center text-center ${width} text-xs md:text-sm font-medium text-white md:py-3 py-1`} onClick={() => updateSort(text)}>{(LABEL_TO_PROP.get(text) === sortCol) && sortArrow(sortDescending)}{text}</div>
  }

  const sortArrow = (descending: boolean) => {
    return descending ? '▼ ': '▲ ' 
  }

  return (
    <>
    <div className="flex flex-col">
      <div className="sticky top-0">
        <div className="flex flex-row md:p-3 bg-black">
          {th('Rank', "md:w-20 w-10")}
          {th('Player', "md:w-64 w-32")}
          {th('Rating', "md:w-40 w-20")}
          {th('Strength of schedule', "md:w-44 w-20")}
          {th('W/L', "md:w-20 w-10")}
        <div className="md:w-5 w-4"></div>
        </div>
      </div>
      {sortedPlayers.length > 0 &&
          sortedPlayers.map((p: Player, index: number) => <Row key={p.name} player={p} />)}
    </div>
    {!sortedPlayers.length &&  <div role="status" className="flex items-center justify-center p-20">
            <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
          </div>
    }
  </>
  );
}
