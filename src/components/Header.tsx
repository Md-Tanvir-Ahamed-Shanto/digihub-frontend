import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, Handshake, Menu, X } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationItems = [{
    title: 'Home',
    href: '/'
  }, {
    title: 'Solutions',
    href: '/solutions'
  }, {
    title: 'Case Studies',
    href: '/case-studies'
  }, {
    title: 'How It Works',
    href: '/how-it-works'
  }, {
    title: 'About',
    href: '/about'
  }, {
    title: 'Contact',
    href: '/contact'
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Globe className="w-8 h-8 text-brand-primary" />
              <Handshake className="w-4 h-4 text-brand-accent absolute -bottom-1 -right-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-indigo-500">DIGIHUB AUST</span>
              <span className="text-sm font-light text-brand-gray-600 -mt-1">Digital Solutions Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-1">
              {navigationItems.map(item => <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-brand-gray-100 hover:text-brand-primary focus:bg-brand-gray-100 focus:text-brand-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-brand-gray-100/50 data-[state=open]:bg-brand-gray-100/50" asChild>
                    <Link to={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>)}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/client-login">
              <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
                Client Login
              </Button>
            </Link>
            <Link to="/submit-project">
              <Button className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold">
                Start Project
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-brand-gray-700" /> : <Menu className="w-6 h-6 text-brand-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="lg:hidden py-4 border-t border-brand-gray-200 bg-white">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map(item => <Link key={item.title} to={item.href} className="px-4 py-2 text-brand-gray-700 hover:text-brand-primary hover:bg-brand-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {item.title}
                </Link>)}
              <div className="flex flex-col space-y-2 pt-4 border-t border-brand-gray-200">
                <Link to="/client-login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
                    Client Login
                  </Button>
                </Link>
                <Link to="/submit-project" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold">
                    Start Project
                  </Button>
                </Link>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;