import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import App from '../../src/App.vue'
import JokeService from '../../src/services/JokeService.js'

const API = 'https://icanhazdadjoke.com/'
const $t = () => { }

const randomJoke = JokeService.getRandomJoke = jest.fn(() =>
  Promise.resolve({
    data: {
      id: 'trjG61Dlqzd',
      joke: "Why was Santa's little helper feeling depressed? Because he has low elf esteem.",
      status: '200',
    },
  })
)

describe('App.vue', () => {
  it('renders header and returns a random joke when created', async () => {
    const wrapper = shallowMount(App, {
      mocks: { $t }
    })
    expect(wrapper.text()).toContain('More Dad Jokes!!')
    await flushPromises()
    expect(randomJoke).toHaveBeenCalledTimes(1)
  })

  it('fetches joke when random joke button is clicked', async () => {
    const wrapper = shallowMount(App)
    wrapper.find('button').trigger('click')
    await flushPromises()
    expect(wrapper.find('#joke').exists()).toBe(true)
    expect(randomJoke).toHaveBeenCalledTimes(2)
  })
})