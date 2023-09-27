import { render, screen ,fireEvent , } from "@testing-library/react"
import App from "./App"
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { InputUrl } from './components/Example/inputUrl'

describe("App", () => {
test("first test", () => {
render(<App />)
const linkElement = screen.getByText(/Generate/i)
expect(linkElement).toBeInTheDocument()
})
})

describe('InputUrl', () => {
    test('renders input field', () => {
      render(<InputUrl />)
  
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  
    test('generates QR code on button click', async () => {
      render(<InputUrl />)
  
      const input = screen.getByRole('textbox')
      const button = screen.getByRole('button', { name: 'Generate' })
  
      fireEvent.change(input, { target: { value: 'https://example.com' }})
      await fireEvent.click(button)
      
      const image = await screen.findByRole('img')
  
      expect(image).toHaveAttribute('src', 'https://api.qrserver.com/v1/create-qr-code/?data=https://example.com') 
    })
  
    test('displays metadata on metadata button click', async () => {
      render(<InputUrl />)
  
      const input = screen.getByRole('textbox')
      const generateBtn = screen.getByRole('button', { name: 'Generate' })
      const metadataBtn = screen.getByRole('button', { name: 'Show Metadata' })
  
      fireEvent.change(input, { target: { value: 'https://example.com' }})
      await fireEvent.click(generateBtn)
      await fireEvent.click(metadataBtn)
  
      expect(screen.getByRole('heading')).toHaveTextContent(/URL:/)
    })
  })