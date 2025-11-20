import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import HeroPortrait from '@images/me.jpeg';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;
  overflow: hidden;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  &:after {
    content: '';
    position: absolute;
    right: clamp(-80px, -6vw, -20px);
    bottom: clamp(-120px, -10vw, -40px);
    width: clamp(220px, 45vw, 520px);
    height: clamp(220px, 45vw, 520px);
  background-image: url(${HeroPortrait});
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0.08;
    pointer-events: none;
  }
`;
const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Gurudatta Patil.</h2>;
  const three = <h3 className="big-heading">I scale AI-driven products.</h3>;
  const four = (
    <>
      <p>
        I’m a software engineer focused on AI infrastructure, realtime gameplay, and planetary-scale
        observability. At{' '}
        <a href="https://www.hp.com" target="_blank" rel="noreferrer">
          HP Inc.
        </a>
        , I ship SONAR—live diagnostics for 1,000+ concurrent A/V streams—and orchestrate ML
        rollouts across Android, C++, and cloud-native services. On the side, I’m building an
        AI-powered storytelling game with Kubernetes-hosted Go services, a Flutter client, and
        Together/OpenAI models.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="mailto:mail.gurudattapatil@gmail.com?subject=Let%27s%20build%20with%20AI"
      target="_blank"
      rel="noreferrer">
      Let’s build together
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
