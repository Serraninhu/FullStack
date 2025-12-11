// home.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Home from '../../views/Home.vue';

describe('Home Component - Testes de Botões', () => {
  let wrapper;
  const mockRouter = {
    push: vi.fn()
  };

  beforeEach(() => {
    wrapper = mount(Home, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    });
    mockRouter.push.mockClear();
  });

  describe('Botões Hero', () => {
    it('deve clicar no botão "Começar Agora" e navegar para /login', async () => {
      const button = wrapper.find('.primary-button');
      
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('Começar Agora');
      
      await button.trigger('click');
      
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
    });

    it('deve clicar no botão "Saiba Mais" e navegar para /servicos', async () => {
      const button = wrapper.find('.secondary-button');
      
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('Saiba Mais');
      
      await button.trigger('click');
      
      expect(mockRouter.push).toHaveBeenCalledWith('/servicos');
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
    });
  });

  describe('Botão CTA', () => {
    it('deve clicar no botão "Solicitar Demonstração" e navegar para /login', async () => {
      const button = wrapper.find('.cta-button');
      
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('Solicitar Demonstração');
      
      await button.trigger('click');
      
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
    });
  });

  describe('Todos os Botões', () => {
    it('deve ter exatamente 3 botões na página', () => {
      const allButtons = wrapper.findAll('button');
      expect(allButtons).toHaveLength(3);
    });

    it('deve ter todos os botões clicáveis', () => {
      const allButtons = wrapper.findAll('button');
      allButtons.forEach(button => {
        expect(button.element.tagName).toBe('BUTTON');
      });
    });
  });
});