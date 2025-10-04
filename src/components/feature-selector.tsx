'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { EyeOption, MouthOption, EyebrowOption } from "@/lib/types"
import { eyeOptions, mouthOptions, eyebrowOptions } from "@/lib/types"

type FeatureSelectorProps = {
  activeFeatures: { eyes: EyeOption; mouth: MouthOption; eyebrows: EyebrowOption };
  onFeatureChange: (feature: 'eyes' | 'mouth' | 'eyebrows', value: EyeOption | MouthOption | EyebrowOption) => void;
};

export function FeatureSelector({ activeFeatures, onFeatureChange }: FeatureSelectorProps) {
  return (
    <Card className="w-full lg:max-w-sm shadow-md">
      <CardHeader>
        <CardTitle className="font-headline">Customize Features</CardTitle>
        <CardDescription>Select a feature to change it.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="eyes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="eyes">Eyes</TabsTrigger>
            <TabsTrigger value="mouth">Mouth</TabsTrigger>
            <TabsTrigger value="eyebrows">Eyebrows</TabsTrigger>
          </TabsList>
          <TabsContent value="eyes" className="pt-4">
            <div className="grid grid-cols-2 gap-2">
              {eyeOptions.map(option => (
                <Button 
                  key={option} 
                  variant={activeFeatures.eyes === option ? 'default' : 'outline'}
                  onClick={() => onFeatureChange('eyes', option)}
                  className="capitalize transition-all"
                >
                  {option}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="mouth" className="pt-4">
             <div className="grid grid-cols-2 gap-2">
              {mouthOptions.map(option => (
                <Button 
                  key={option} 
                  variant={activeFeatures.mouth === option ? 'default' : 'outline'}
                  onClick={() => onFeatureChange('mouth', option)}
                  className="capitalize transition-all"
                >
                  {option}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="eyebrows" className="pt-4">
            <div className="grid grid-cols-2 gap-2">
              {eyebrowOptions.map(option => (
                <Button 
                  key={option} 
                  variant={activeFeatures.eyebrows === option ? 'default' : 'outline'}
                  onClick={() => onFeatureChange('eyebrows', option)}
                  className="capitalize transition-all"
                >
                  {option}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
