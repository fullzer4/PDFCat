async function readListsBytes(filePath: string): Promise<{ leftList: number[]; rightList: number[] }> {
    const data = await Deno.readFile(filePath)
    const leftList: number[] = []
    const rightList: number[] = []
  
    let idx = 0
    const len = data.length
    const decoder = new TextDecoder()
    let numberBuffer = ''
    const numbersInLine: number[] = []
  
    while (idx < len) {
        const byte = data[idx]
  
        if (byte === 32 || byte === 9) {
            if (numberBuffer !== '') {
                const num = parseInt(numberBuffer, 10)
                if (!isNaN(num)) {
                    numbersInLine.push(num)
                }
                numberBuffer = ''
            }
            } else if (byte === 10 || byte === 13) {
                if (numberBuffer !== '') {
                const num = parseInt(numberBuffer, 10)
                if (!isNaN(num)) {
                    numbersInLine.push(num)
                }
                numberBuffer = ''
            }
            if (numbersInLine.length === 2) {
                leftList.push(numbersInLine[0])
                rightList.push(numbersInLine[1])
            }
            numbersInLine.length = 0
        } else {
            numberBuffer += String.fromCharCode(byte)
        }
        idx++
    }
  
    if (numberBuffer !== '') {
        const num = parseInt(numberBuffer, 10)
        if (!isNaN(num)) {
            numbersInLine.push(num)
        }
    }
    if (numbersInLine.length === 2) {
        leftList.push(numbersInLine[0])
        rightList.push(numbersInLine[1])
    }
  
    return { leftList, rightList }
}
  
function calculateTotalDistance(leftList: number[], rightList: number[]): number {
    leftList.sort((a, b) => a - b)
    rightList.sort((a, b) => a - b)
  
    let totalDistance = 0
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i])
    }
    return totalDistance
}
  
export async function mainOptimized() {
    const filePath = "./input_1.txt"
    const { leftList, rightList } = await readListsBytes(filePath)
    const totalDistance = calculateTotalDistance(leftList, rightList)
    console.log("Distancia total (Otimizado):", totalDistance)
}