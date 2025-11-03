import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
  
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .limit(5)

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      message: '✅ Connected to Supabase!',
      categories: data 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}