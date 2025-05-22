<template>
    <div class="signature-container">
      <!-- 签名画布 -->
      <canvas
        ref="canvas"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend.prevent="stopDrawing"
      ></canvas>
  
      <!-- 操作按钮 -->
      <div class="controls">
        <button @click="clearCanvas">清除</button>
        <button @click="saveSignature" :disabled="isCanvasEmpty">保存签名</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignaturePad',
    data() {
      return {
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        ctx: null,
        isCanvasEmpty: true
      }
    },
    mounted() {
      this.initCanvas()
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      // 初始化画布
      initCanvas() {
        const canvas = this.$refs.canvas
        const rect = canvas.getBoundingClientRect()
        const ratio = window.devicePixelRatio || 1
  
        // 设置物理像素尺寸
        canvas.width = rect.width * ratio
        canvas.height = rect.height * ratio
  
        // 设置显示尺寸
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
  
        this.ctx = canvas.getContext('2d')
        this.ctx.scale(ratio, ratio)
        this.ctx.strokeStyle = '#000000'
        this.ctx.lineWidth = 2
        this.ctx.lineJoin = 'round'
        this.ctx.lineCap = 'round'
      },
  
      // 窗口大小变化处理
      handleResize() {
        this.initCanvas()
      },
  
      // 获取坐标（兼容触摸事件）
      getCanvasCoordinates(e) {
        const canvas = this.$refs.canvas
        const rect = canvas.getBoundingClientRect()
        
        if (e.touches) {
          return {
            x: (e.touches[0].clientX - rect.left) * (canvas.width / rect.width) / window.devicePixelRatio,
            y: (e.touches[0].clientY - rect.top) * (canvas.height / rect.height) / window.devicePixelRatio
          }
        } else {
          return {
            x: (e.clientX - rect.left) * (canvas.width / rect.width) / window.devicePixelRatio,
            y: (e.clientY - rect.top) * (canvas.height / rect.height) / window.devicePixelRatio
          }
        }
      },
  
      // 开始绘制
      startDrawing(e) {
        this.isDrawing = true
        const pos = this.getCanvasCoordinates(e)
        this.lastX = pos.x
        this.lastY = pos.y
      },
  
      // 绘制过程
      draw(e) {
        if (!this.isDrawing) return
        
        const pos = this.getCanvasCoordinates(e)
        
        this.ctx.beginPath()
        this.ctx.moveTo(this.lastX, this.lastY)
        this.ctx.lineTo(pos.x, pos.y)
        this.ctx.stroke()
        
        this.lastX = pos.x
        this.lastY = pos.y
        this.isCanvasEmpty = false
      },
  
      // 停止绘制
      stopDrawing() {
        this.isDrawing = false
      },
  
      // 清除画布
      clearCanvas() {
        const canvas = this.$refs.canvas
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.isCanvasEmpty = true
      },
  
      // 保存签名
      saveSignature() {
        const canvas = this.$refs.canvas
        canvas.toBlob(blob => {
          const link = document.createElement('a')
          link.download = `signature_${Date.now()}.png`
          link.href = URL.createObjectURL(blob)
          link.click()
          URL.revokeObjectURL(link.href)
        }, 'image/png')
      },
  
      // 触摸事件处理
      handleTouchStart(e) {
        this.startDrawing(e.touches[0])
      },
  
      handleTouchMove(e) {
        this.draw(e.touches[0])
      }
    }
  }
  </script>
  
  <style scoped>
  .signature-container {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    background: white;
    max-width: 600px;
    margin: 20px auto;
  }
  
  canvas {
    border: 1px solid #cccccc;
    background-color: #f8f9fa;
    touch-action: none;
    width: 100%;
    height: 350px;
  }
  
  .controls {
    margin-top: 15px;
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background: #007bff;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  button:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
  
  button:not(:disabled):hover {
    background: #0056b3;
  }
  </style>