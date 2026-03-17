import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      // RouterTestingModule fornece as diretivas routerLink e routerLinkActive
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct routerLinks in the navigation bar', () => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

    const hrefs = debugElements.map(de => de.properties['href']);

    expect(hrefs.some(h => h.endsWith('/'))).withContext('Should have a link to Home').toBeTrue();
    expect(hrefs.some(h => h.endsWith('/ask-ai'))).withContext('Should have a link to Ask-AI').toBeTrue();
    expect(hrefs.some(h => h.endsWith('/generate-recipe'))).withContext('Should have a link to Generate Recipe').toBeTrue();
    expect(hrefs.some(h => h.endsWith('/generate-image'))).withContext('Should have a link to Generate Image').toBeTrue();
  });

  it('should have at least 5 links (Logo + 4 menu items)', () => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    expect(debugElements.length).toBeGreaterThanOrEqual(5);
  });
});
