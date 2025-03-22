import { Container, Newable } from 'inversify';

type DependencyRegistration = {
  id: symbol;
  dependency: unknown;
  singleton?: boolean;
};

export class DIContainer extends Container {
  public registerDependencies(deps: DependencyRegistration[]): this {
    deps.forEach(({ id, dependency, singleton }) => {
      const binding = this.bind<typeof dependency>(id).to(
        dependency as Newable<typeof dependency>
      );

      if (singleton) {
        binding.inSingletonScope();
      }
    });

    return this;
  }
}
