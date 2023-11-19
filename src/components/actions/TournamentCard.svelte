<script lang="ts">
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import type { Selection, BaseType, ZoomBehavior, ZoomedElementBaseType, D3ZoomEvent, ZoomTransform } from 'd3'

  let svg: Selection<SVGSVGElement, unknown, BaseType, unknown>
  let g: Selection<SVGGElement, unknown, BaseType, unknown>

  onMount(() => {
    const containerWidth = 1120
    const containerHeight = 458
    const svgWidth = 1700
    const svgHeight = 1250

    const zoom: ZoomBehavior<ZoomedElementBaseType, unknown> = d3
      .zoom()
      .scaleExtent([1, 1]) // Désactive le zoom
      .translateExtent([
        [0, 0],
        [svgWidth, svgHeight]
      ]) // Limite le déplacement
      .on('zoom', zoomed)

    svg = d3
      .select<SVGSVGElement, unknown>('#tournament')
      .append('svg')
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .style('cursor', 'move')
      .call(zoom as any)

    g = svg.append('g')

    // Ajoutez ici le code pour créer le contenu du SVG
    // Par exemple, pour créer un rectangle :
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8 / Math.pow(2, i); j++) {
        addRectangle(i * 350, Math.pow(2, i) * j * 160 + 40 * (Math.pow(2, i) - 1))
        addRectangle(i * 350, Math.pow(2, i) * j * 160 + 60 * Math.pow(2, i + 1) - 40)
        addBracket(i * 350 + 200, Math.pow(2, i) * j * 160, Math.pow(2, i))
      }
    }

    // for (let i = 0; i < 8; i++) {
    //   addRectangle(0, i * 160 + 0)
    //   addRectangle(0, i * 160 + 80)
    //   addBracket(200, i * 160, 1)
    // }

    // for (let i = 0; i < 4; i++) {
    //   addRectangle(350, i * 320 + 40)
    //   addRectangle(350, i * 320 + 200)
    //   addBracket(550, i * 320, 2)
    // }

    // for (let i = 0; i < 2; i++) {
    //   addRectangle(700, i * 640 + 120)
    //   addRectangle(700, i * 640 + 440)
    //   addBracket(900, i * 640, 4)
    // }

    // for (let i = 0; i < 1; i++) {
    //   addRectangle(1050, 280)
    //   addRectangle(1050, 920)
    //   addBracket(1250, 0, 8)
    // }

    addRectangle(1400, 600)
  })

  function addRectangle(x: number, y: number) {
    g.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', 200)
      .attr('height', 50)
      .attr('rx', 2)
      .attr('ry', 2)
      .style('fill', '#f5f5f5')
  }

  function addBracket(x: number, y: number, c: number) {
    g.append('path')
      .attr(
        'd',
        `
        M ${x} ${y + 25 * c + 15 * (c - 1)} 
        L ${x + 100} ${y + 25 * c + 15 * (c - 1)} 
        L ${x + 100} ${y + c * 135 - 15 * (c + 1)}
        L ${x} ${y + c * 135 - 15 * (c + 1)}
        M ${x + 100} ${y + (160 * c - 30) / 2} 
        L ${x + 150} ${y + (160 * c - 30) / 2}
      `
      )
      .attr('stroke', '#dedede')
      .attr('fill', 'none')
  }

  function zoomed(event: D3ZoomEvent<ZoomedElementBaseType, unknown>) {
    g.attr('transform', event.transform.toString())
  }
</script>

<div class="card" style="height: 520px">
  <h4>Tournoi</h4>

  <div id="tournament" />
</div>

<style lang="scss">
  @import url('/assets/sass/cards.scss');
</style>
