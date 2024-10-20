"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [currentStep, setCurrentStep] = useState(-1)
  const [animationSpeed, setAnimationSpeed] = useState(1000)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationSteps, setAnimationSteps] = useState<string[]>([])

  const pseudocode = [
    "function reverseWords(s):",
    "  arr = s.trim().split(/\\s+/)",
    "  ans = ''",
    "  for i = arr.length - 1 to 0:",
    "    ans += arr[i]",
    "    if i != 0:",
    "      ans += ' '",
    "  return ans"
  ]

  const reverseWords = (s: string) => {
    const steps: string[] = []
    // Trim the string and split by spaces
    const arr = s.trim().split(/\s+/);
    steps.push(`arr = [${arr.join(', ')}]`)

    let ans = '';
    // Loop through the array of words in reverse
    for (let i = arr.length - 1; i >= 0; i--) {
      ans += arr[i];
      if (i !== 0) {
        ans += ' '; // Add space between words except after the last word
      }
      steps.push(`ans = "${ans}"`)
    }
    return { result: ans, steps }
  }

  const handleReverse = () => {
    setCurrentStep(-1)
    setIsAnimating(true)
    const { result, steps } = reverseWords(input)
    setOutput(result)
    setAnimationSteps(steps)

    let step = 0
    const interval = setInterval(() => {
      if (step < steps.length) {
        setCurrentStep(step)
        step++
      } else {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, animationSpeed)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 space-y-6 bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">Word Reversal Algorithm</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
                Enter a sentence:
              </label>
              <Input
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your sentence here..."
                className="w-full"
              />
            </div>
            <Button 
              onClick={handleReverse} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isAnimating}
            >
              {isAnimating ? 'Reversing...' : 'Reverse Words'}
            </Button>
            {output && (
              <div className="mt-4">
                <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-1">
                  Reversed sentence:
                </label>
                <div
                  id="output"
                  className="p-3 bg-gray-100 rounded-md text-gray-800 font-medium break-words"
                >
                  {output}
                </div>
              </div>
            )}
            <div>
              <label htmlFor="speed" className="block text-sm font-medium text-gray-700 mb-1">
                Animation Speed (ms):
              </label>
              <Input
                id="speed"
                type="number"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Algorithm Visualization:</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="font-mono text-sm mb-4">
                {pseudocode.map((line, index) => (
                  <pre 
                    key={index} 
                    className={`${(index === 1 && currentStep === 0) || (index >= 3 && index <= 6 && currentStep > 0) ? 'bg-yellow-200' : ''}`}
                  >
                    {line}
                  </pre>
                ))}
              </div>
              <div className="mt-4 font-mono text-sm">
                <h3 className="font-semibold mb-2">Current Step:</h3>
                <pre className="bg-blue-100 p-2 rounded">
                  {currentStep >= 0 && currentStep < animationSteps.length ? animationSteps[currentStep] : 'Waiting to start...'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}