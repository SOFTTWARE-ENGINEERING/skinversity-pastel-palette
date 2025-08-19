import { supabase } from "@/integrations/supabase/client";
import type { Order, OrderItem, OrderWithItems } from "@/types/order";
import type { Product } from "@/types/product";

export const createOrder = async (
  userId: string,
  items: { product: Product; quantity: number }[],
  total: number
): Promise<{ order: Order | null; error: string | null }> => {
  try {
    // Start a transaction by creating the order first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total: total,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError || !order) {
      return { order: null, error: orderError?.message || 'Failed to create order' };
    }

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      // If items fail, we should delete the order (rollback)
      await supabase.from('orders').delete().eq('id', order.id);
      return { order: null, error: itemsError.message };
    }

    return { order, error: null };
  } catch (error) {
    return { order: null, error: (error as Error).message };
  }
};

export const fetchUserOrders = async (userId: string): Promise<{ orders: OrderWithItems[]; error: string | null }> => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return { orders: [], error: error.message };
    }

    return { orders: orders || [], error: null };
  } catch (error) {
    return { orders: [], error: (error as Error).message };
  }
};

export const fetchOrder = async (orderId: string): Promise<{ order: OrderWithItems | null; error: string | null }> => {
  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      return { order: null, error: error.message };
    }

    return { order, error: null };
  } catch (error) {
    return { order: null, error: (error as Error).message };
  }
};

export const updateOrderStatus = async (
  orderId: string, 
  status: Order['status']
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const fetchAllOrders = async (): Promise<{ orders: OrderWithItems[]; error: string | null }> => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return { orders: [], error: error.message };
    }

    return { orders: orders || [], error: null };
  } catch (error) {
    return { orders: [], error: (error as Error).message };
  }
};
