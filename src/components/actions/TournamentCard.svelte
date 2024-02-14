<script lang="ts">
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import type { Selection, BaseType, ZoomBehavior, ZoomedElementBaseType, D3ZoomEvent, ZoomTransform } from 'd3'
  import AddMatchModal from '$components/modals/AddMatchModal.svelte'
  import type { PageData } from '../../routes/admin/$types'
  import EditMatchModal from '$components/modals/EditMatchModal.svelte'

  export let data: PageData

  let svgC: Selection<SVGSVGElement, unknown, BaseType, unknown>
  let gC: Selection<SVGGElement, unknown, BaseType, unknown>
  let iC = 0
  let jC = 0

  let svgL: Selection<SVGSVGElement, unknown, BaseType, unknown>
  let gL: Selection<SVGGElement, unknown, BaseType, unknown>
  let iL = 0
  let jL = 0

  let showAddModal = false
  let showEditModal = false
  let editMatch: number
  let allowChangeTeams = false
  let tree: number | undefined = undefined

  let category: 'C' | 'L' = 'C'

  onMount(() => {
    const containerWidth = 1120
    const containerHeight = 458
    const svgWidth = 1700
    const svgHeight = 1250

    const zoomC: ZoomBehavior<ZoomedElementBaseType, unknown> = d3
      .zoom()
      .scaleExtent([1, 1]) // Désactive le zoom
      .translateExtent([
        [0, 0],
        [svgWidth, svgHeight]
      ]) // Limite le déplacement
      .on('zoom', zoomedC)

    const zoomL: ZoomBehavior<ZoomedElementBaseType, unknown> = d3
      .zoom()
      .scaleExtent([1, 1]) // Désactive le zoom
      .translateExtent([
        [0, 0],
        [svgWidth, svgHeight]
      ]) // Limite le déplacement
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

    gC = svgC.append('g')

    gL = svgL.append('g')

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
  })

  $: if (data) {
    if (gC && gL) {
      gC.selectAll('*').remove()
      gC = svgC.append('g')
      iC = 0
      jC = 0

      gL.selectAll('*').remove()
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
  }

  function addRectangle(x: number, y: number, cat: 'C' | 'L') {
    let i = cat === 'C' ? iC : iL

    let school = getSchoolText(i, cat)
    let team = getTeamText(i, cat)

    ;(cat === 'C' ? gC : gL)
      .append('rect')
      .attr('id', `rect-${i}`)
      .attr('x', x)
      .attr('y', y)
      .attr('width', 200)
      .attr('height', 50)
      .attr('rx', 2)
      .attr('ry', 2)
      .style('fill', '#f5f5f5')
    ;(cat === 'C' ? gC : gL)
      .append('text')
      .attr('x', x + 10)
      .attr('y', y + 15)
      .attr('text-anchor', 'left')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .text(school)
    ;(cat === 'C' ? gC : gL)
      .append('text')
      .attr('x', x + 10)
      .attr('y', y + 35)
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
        M ${x} ${y + 25 * c + 15 * (c - 1)} 
        L ${x + 60} ${y + 25 * c + 15 * (c - 1)} 
        L ${x + 60} ${y + c * 135 - 15 * (c + 1)}
        L ${x} ${y + c * 135 - 15 * (c + 1)}
        M ${x + 60} ${y + (160 * c - 30) / 2} 
        L ${x + 150} ${y + (160 * c - 30) / 2}
      `
      )
      .attr('stroke', '#dedede')
      .attr('fill', 'none')
    ;(cat === 'C' ? gC : gL)
      .append('rect')
      .attr('id', `match-${j}`)
      .attr('x', x + 40)
      .attr('y', y + (160 * c - 30) / 2 - 45)
      .attr('width', 40)
      .attr('height', 90)
      .attr('rx', 20)
      .attr('ry', 20)
      .style('fill', '#f5f5f5')
      .style('cursor', 'pointer')
      .on('click', (e) => {
        if (data.matches.find((match) => match.tree === +e.target.id.split('-')[1] && match.category === category)) {
          tree = +e.target.id.split('-')[1]
          if (tree < 16) allowChangeTeams = true
          else allowChangeTeams = false
          showEditModal = true
        } else {
          tree = +e.target.id.split('-')[1]
          if (tree < 16) allowChangeTeams = true
          else allowChangeTeams = false
          showAddModal = true
        }
      })
      .on('mouseover', function () {
        d3.select(this).style('fill', '#d5d5d5')
      })
      .on('mouseout', function () {
        d3.select(this).style('fill', '#f5f5f5')
      })

    // add scores text, if score1 or score2 is not null
    let match = data.matches.find((match) => match.tree === j && match.category === cat)
    if (match && (match.score1 || match.score2)) {
      ;(cat === 'C' ? gC : gL)
        .append('text')
        .attr('x', x + 60)
        .attr('y', y + (160 * c - 30) / 2 - 20)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', (match.score1 || 0) > (match.score2 || 0) ? '20px' : '15px')
        .style('font-weight', 'bold')
        .text(match.score1 || 0)
        .on('click', () => {
          document.getElementById(`match-${j}`)?.dispatchEvent(new MouseEvent('click'))
        })
      ;(cat === 'C' ? gC : gL)
        .append('text')
        .attr('x', x + 60)
        .attr('y', y + (160 * c - 30) / 2 + 20)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', (match.score1 || 0) < (match.score2 || 0) ? '20px' : '15px')
        .style('font-weight', 'bold')
        .text(match.score2 || 0)
        .on('click', () => {
          document.getElementById(`match-${j}`)?.dispatchEvent(new MouseEvent('click'))
        })
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

  function toggle(to: 'C' | 'L') {
    if (to === 'C') category = 'C'
    else category = 'L'
  }
</script>

<div class="card" style="height: 520px">
  <div class="toggle">
    <h4>Tournoi</h4>
    <button class:primary={category === 'C'} class:secondary={category === 'L'} on:click={() => toggle('C')}>Collège</button>
    <button class:primary={category === 'L'} class:secondary={category === 'C'} on:click={() => toggle('L')}>Lycée</button>
  </div>

  <div id="tournament-c" style="display: {category === 'C' ? 'block' : 'none'}" />
  <div id="tournament-l" style="display: {category === 'L' ? 'block' : 'none'}" />
</div>

<EditMatchModal bind:show={showEditModal} bind:data bind:allowChangeTeams bind:category bind:tree />
<AddMatchModal bind:show={showAddModal} bind:data bind:allowChangeTeams bind:category bind:tree />

<style lang="scss">
  @use '../../../static/assets/sass/cards.scss';

  h4 {
    display: inline-block;
    margin-top: 3px;
    margin-bottom: 0;
    margin-right: 30px;
  }

  div.toggle {
    display: flex;
    margin-bottom: 30px;
    height: 40px;

    button {
      width: 100px;
      margin: 0;
      font-weight: bold;

      &.secondary {
        padding: 5px 0 !important;
        margin: 3px 0;
      }
    }
  }
</style>
