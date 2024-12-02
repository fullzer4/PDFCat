async function readLists(filePath: string): Promise<{ leftList: number[]; rightList: number[] }> {
    const decoder = new TextDecoder("utf-8")
    const data = await Deno.readFile(filePath)
    const lines = decoder.decode(data).trim().split("\n")
  
    const leftList: number[] = []
    const rightList: number[] = []
  
    for (const line of lines) {
        const [leftStr, rightStr] = line.trim().split(/\s+/)
        const leftNum = parseInt(leftStr, 10)
        const rightNum = parseInt(rightStr, 10)
  
        if (!isNaN(leftNum) && !isNaN(rightNum)) {
            leftList.push(leftNum)
            rightList.push(rightNum)
        }
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
  
export async function main() {
    const filePath = "./input_1.txt"
    const { leftList, rightList } = await readLists(filePath)
    const totalDistance = calculateTotalDistance(leftList, rightList)
    console.log("Distancia total (Original):", totalDistance)
}