import React, { useEffect, useState } from 'react';
import { Table } from '../../Table';
import { Player } from '../../../lib/player'
import playersJson from '../../../../cron/data/players.json';
import * as settings from '../../../../settings'

const PLAYER_TO_CHARACTERS = new Map([
  ['Owl', ['MARTH']],
  ['Fizzwiggle', ['SHEIK']],
  ['Polear', ['MARTH']],
  ['Miyagi', ['FOX']],
  ['DD', ['JIGGLYPUFF']],
  ['O2 | | Sayren', ['FALCO']],
  ['GetCrabby', ['MARTH']],
  ['James Jr.', ['FOX']],
  ['Zealot', ['FOX', 'SHEIK', 'MARTH', 'FALCO']],
  ['Loam', ['FALCO']],
  ['LIAM#697 | Shleeum', ['FOX', 'FALCO', 'MARTH']],
  ['DSJ', ['JIGGLYPUFF']],
  ['Big Piney', ['JIGGLYPUFF']],
  ['Conman', ['FOX']],
  ['Neuron', ['FOX']],
  ['Omegam', ['SHEIK']],
  ['w0mp', ['FOX']],
  ['RIZ', ['FOX']],
  ['Grillindude', ['SAMUS']],
  ['Rrob', ['FOX']],
  ['blorppppp', ['SHEIK']],
  ['Dr | Pill Nye', ['DR_MARIO', 'DONKEY_KONG']],
  ['Kiefer', ['SHEIK']],
  ['3rd Strongest', ['FOX']],
  ['WizP', ['SHEIK', 'FOX']],
  ['KB | ChucklesTheCheat', ['FALCO']],
  ['Quest', ['FOX']],
  ['Stinky', ['LUIGI']],
  ['Jab', ['CAPTAIN_FALCON']],
  ['Gingerham', ['FOX']],
  ['Spin', ['FALCO']],
  ['PkThundah', ['ICE_CLIMBERS']],
  ['elel', ['FOX']],
  ['foxtrot', ['SHEIK']],
  ['Slatty', ['MARTH']],
  ['Wheels', ['FOX', 'FALCO']],
  ['Cheunk', ['PEACH']],
  ['Swid', ['FALCO']],
  ['Janke', ['SAMUS']],
  ['fidibidi', ['PEACH']],
  ['zapwad', ['FOX']],
  ['Critius', ['DR_MARIO']],
  ['JJFF', ['NESS']],
  ['Fallen', ['FALCO']],
  ['Hada', ['PEACH']],
  ['shwang', ['MARTH']],
  ['Ace?', ['LUIGI']],
  ['Neptune', ['ICE_CLIMBERS']],
  ['AceBox', ['JIGGLYPUFF']],
  ['Kasumi', ['DR_MARIO']],
  ['MP3', ['NESS']],
  ['Ultra', ['FOX']],
  ['Russell', ['FOX']],
  ['Shleeum', ['FOX', 'FALCO', 'MARTH']],
  ['Phazon', ['SAMUS']],
  ['SpecialK', ['Falco']],
  ['OC Zack', ['MARTH']],
  ['Noah', ['FOX']],
  ['Foxtrot', ['SHEIK']],
  ['Jasper', ['LUIGI']],
  ['honey!', ['LUIGI']],
])

export default function HomePage() {
  const players = playersJson as Player[]
  const nameToPlayer = new Map(players.map((p) => [p.name, p]))
  players.forEach((p) => {
    p.characters = PLAYER_TO_CHARACTERS.get(p.name) ?? []
    p.player_records = p.records.map((r) => {
      return {
        wins: r.wins,
        losses: r.losses,
        opponent: nameToPlayer.get(r.opponent)
      }
    })
  })
  const sortedPlayersByStrength = [...players].sort((a, b) => b.colley_strength_of_schedule - a.colley_strength_of_schedule) as Player[]
  sortedPlayersByStrength.forEach((p, i) => {
    p.colley_strength_of_schedule_rank = i + 1
  })

  const coffee = () => {
    return <div className="p-2 text-gray-300 flex flex-col">
        <div>
          <a href="https://www.buymeacoffee.com/blorppppp" target="_blank" rel="noreferrer"
             className="text-gray-400 hover:text-indigo-300 mr-2 hover:underline">
            Buy me a coffee ☕
          </a>
        </div>
      </div>
  }
  return (
    <div className="flex flex-col items-center h-screen p-8">
      <h1 className="text-3xl m-4 text-center text-white">
        {settings.title}
      </h1>
      <a href="https://www.colleyrankings.com/matrate.pdf" target="_blank" rel="noreferrer"
         className="text-gray-400 hover:text-indigo-300 mr-2 hover:underline">
        Ranking Methodology       
      </a>
      
      {coffee()}
      <Table players={players} />
      {coffee()}
    </div>
  );
}
