<script lang="ts">
  import type { PageData } from './$types'
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import type { Selection, BaseType, ZoomedElementBaseType, D3ZoomEvent } from 'd3'
  import type { Match } from '$models/features/match.model'

  export let data: PageData

  let svgC: Selection<SVGSVGElement, unknown, BaseType, unknown>
  let gC: Selection<SVGGElement, unknown, BaseType, unknown>
  let iC: number
  let jC: number

  let svgL: Selection<SVGSVGElement, unknown, BaseType, unknown>
  let gL: Selection<SVGGElement, unknown, BaseType, unknown>
  let iL: number
  let jL: number

  onMount(() => {
    const containerWidth = window.innerWidth > 1240 ? 1200 : window.innerWidth - 40
    const containerHeight = 458
    const svgWidth = 1650
    const svgHeight = 1290

    const zoomC = d3
      .zoom()
      .scaleExtent([1, 1])
      .translateExtent([
        [0, 0],
        [svgWidth, svgHeight]
      ])
      .on('zoom', zoomedC)

    const zoomL = d3
      .zoom()
      .scaleExtent([1, 1])
      .translateExtent([
        [0, 0],
        [svgWidth, svgHeight]
      ])
      .on('zoom', zoomedL)

    svgC = d3
      .select<SVGSVGElement, unknown>('#tournament-c')
      .append('svg')
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .style('cursor', 'move')
      .call(zoomC as any)

    svgL = d3
      .select<SVGSVGElement, unknown>('#tournament-l')
      .append('svg')
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .style('cursor', 'move')
      .call(zoomL as any)

    init()
  })

  $: if (data) {
    if (gC && gL) {
      gC.selectAll('*').remove()
      gL.selectAll('*').remove()
      init()
    }
  }

  function init() {
    gC = svgC.append('g')
    iC = 0
    jC = 0

    gL = svgL.append('g')
    iL = 0
    jL = 0

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8 / Math.pow(2, i); j++) {
        addRectangle(i * 350, Math.pow(2, i) * j * 160 + 40 * (Math.pow(2, i) - 1), 'C')
        addRectangle(i * 350, Math.pow(2, i) * j * 160 + 60 * Math.pow(2, i + 1) - 40, 'C')
        addBracket(i * 350 + 200, Math.pow(2, i) * j * 160, Math.pow(2, i), 'C')
      }
    }
    addRectangle(1400, 600, 'C')

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8 / Math.pow(2, i); j++) {
        addRectangle(i * 350, Math.pow(2, i) * j * 160 + 40 * (Math.pow(2, i) - 1), 'L')
        addRectangle(i * 350, Math.pow(2, i) * j * 160 + 60 * Math.pow(2, i + 1) - 40, 'L')
        addBracket(i * 350 + 200, Math.pow(2, i) * j * 160, Math.pow(2, i), 'L')
      }
    }
    addRectangle(1400, 600, 'L')
  }

  function addRectangle(x: number, y: number, cat: 'C' | 'L') {
    let i = cat === 'C' ? iC : iL

    let school = getSchoolText(i, cat)
    let team = getTeamText(i, cat)

    ;(cat === 'C' ? gC : gL)
      .append('rect')
      .attr('id', `rect-${i}`)
      .attr('x', x + 20)
      .attr('y', y + 20)
      .attr('width', 200)
      .attr('height', 50)
      .attr('rx', 2)
      .attr('ry', 2)
      .style('fill', '#f5f5f5')
    ;(cat === 'C' ? gC : gL)
      .append('text')
      .attr('x', x + 10 + 20)
      .attr('y', y + 15 + 20)
      .attr('text-anchor', 'left')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .text(school)
    ;(cat === 'C' ? gC : gL)
      .append('text')
      .attr('x', x + 10 + 20)
      .attr('y', y + 35 + 20)
      .attr('text-anchor', 'left')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '15px')
      .style('font-weight', 'bold')
      .text(team)

    if (cat === 'C') iC++
    else iL++
  }

  function addBracket(x: number, y: number, c: number, cat: 'C' | 'L') {
    let j = cat === 'C' ? jC : jL

    ;(cat === 'C' ? gC : gL)
      .append('path')
      .attr(
        'd',
        `
        M ${x + 20} ${y + 25 * c + 15 * (c - 1) + 20} 
        L ${x + 60 + 20} ${y + 25 * c + 15 * (c - 1) + 20} 
        L ${x + 60 + 20} ${y + c * 135 - 15 * (c + 1) + 20}
        L ${x + 20} ${y + c * 135 - 15 * (c + 1) + 20}
        M ${x + 60 + 20} ${y + (160 * c - 30) / 2 + 20}
        L ${x + 150 + 20} ${y + (160 * c - 30) / 2 + 20}
      `
      )
      .attr('stroke', '#dedede')
      .attr('fill', 'none')
    ;(cat === 'C' ? gC : gL)
      .append('rect')
      .attr('id', `match-${j}`)
      .attr('x', x + 40 + 20)
      .attr('y', y + (160 * c - 30) / 2 - 45 + 20)
      .attr('width', 40)
      .attr('height', 90)
      .attr('rx', 20)
      .attr('ry', 20)
      .style('fill', '#f5f5f5')

    let match = data.matches.find((match) => match.tree === j && match.category === cat)
    if (match && (match.score1 || match.score2)) {
      ;(cat === 'C' ? gC : gL)
        .append('text')
        .attr('x', x + 60 + 20)
        .attr('y', y + (160 * c - 30) / 2 - 20 + 20)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', (match.score1 || 0) > (match.score2 || 0) ? '20px' : '15px')
        .style('font-weight', 'bold')
        .text(match.score1 || 0)
      ;(cat === 'C' ? gC : gL)
        .append('text')
        .attr('x', x + 60 + 20)
        .attr('y', y + (160 * c - 30) / 2 + 20 + 20)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', (match.score1 || 0) < (match.score2 || 0) ? '20px' : '15px')
        .style('font-weight', 'bold')
        .text(match.score2 || 0)
    }

    if (cat === 'C') jC += 2
    else jL += 2
  }

  function getSchoolText(i: number, cat: 'C' | 'L') {
    if (i < 16) {
      let match =
        i % 2 === 0
          ? data.matches.find((match) => match.tree === i && match.category === cat)
          : data.matches.find((match) => match.tree === i - 1 && match.category === cat)
      return match && i % 2 === 0
        ? data.schools.find((school) => school.id === data.teams.find((team) => team.id === match?.team1)?.school)?.name + ''
        : match && i % 2 === 1
        ? data.schools.find((school) => school.id === data.teams.find((team) => team.id === match?.team2)?.school)?.name + ''
        : ''
    } else {
      let match = data.matches.find(
        (match) => match.tree === (i - 16) * 2 && match.category === cat && (match.score1 || match.score2)
      )
      return match && (match.score1 || 0) > (match.score2 || 0)
        ? data.schools.find((school) => school.id === data.teams.find((team) => team.id === match?.team1)?.school)?.name + ''
        : match && (match.score1 || 0) < (match.score2 || 0)
        ? data.schools.find((school) => school.id === data.teams.find((team) => team.id === match?.team2)?.school)?.name + ''
        : ''
    }
  }

  function getTeamText(i: number, cat: 'C' | 'L') {
    if (i < 16) {
      let match =
        i % 2 === 0
          ? data.matches.find((match) => match.tree === i && match.category === cat)
          : data.matches.find((match) => match.tree === i - 1 && match.category === cat)
      return match && i % 2 === 0
        ? data.teams.find((team) => team.id === match?.team1)?.name + ''
        : match && i % 2 === 1
        ? data.teams.find((team) => team.id === match?.team2)?.name + ''
        : ''
    } else {
      let match = data.matches.find(
        (match) => match.tree === (i - 16) * 2 && match.category === cat && (match.score1 || match.score2)
      )
      return match && (match.score1 || 0) > (match.score2 || 0)
        ? data.teams.find((team) => team.id === match?.team1)?.name + ''
        : match && (match.score1 || 0) < (match.score2 || 0)
        ? data.teams.find((team) => team.id === match?.team2)?.name + ''
        : ''
    }
  }

  function zoomedC(event: D3ZoomEvent<ZoomedElementBaseType, unknown>) {
    gC.attr('transform', event.transform.toString())
  }
  function zoomedL(event: D3ZoomEvent<ZoomedElementBaseType, unknown>) {
    gL.attr('transform', event.transform.toString())
  }
</script>

<svelte:window on:resize={() => {
  if (svgC && svgL) {
    const containerWidth = window.innerWidth > 1240 ? 1200 : window.innerWidth - 40
    svgC.attr('width', containerWidth)
    svgL.attr('width', containerWidth)
  }
}}/>

<svelte:head>
  <title>Tournois • Coupe Jules Rimet</title>
</svelte:head>

<div class="content">
  <h2>Tournois</h2>

  <h3>Tournoi Collège</h3>
  <div class="tournament" id="tournament-c" />

  <h3>Tournoi Lycée</h3>
  <div class="tournament" id="tournament-l" />
</div>

<style lang="scss">
  h3 {
    margin-top: 26px;
    font-size: 20px;
  }

  div.tournament {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    background-color: #121216;
  }
</style>
