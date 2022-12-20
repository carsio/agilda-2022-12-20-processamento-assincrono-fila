import pika
import json
from pytube import YouTube


def download(url):
    print(f'Starting download:{url}')
    yt = YouTube(url)
    yt = yt.streams.get_highest_resolution()
    try:
        yt.download('videos')
    except:
        print("An error has occurred")
    print(f"Download is completed successfully {url}")
    

def callback_youtube_download(ch, method, properties, body):
    download(json.loads(body)["url"])
    ch.basic_ack(delivery_tag=method.delivery_tag)


def main():
    credencitials = pika.PlainCredentials('guest', 'guest')
    params = pika.ConnectionParameters(
        host='localhost',
        port='5672',
        credentials=credencitials,
    )
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    channel.exchange_declare(
        'ex_youtube', 
        durable=True,
        exchange_type='topic'
    )
    channel.basic_consume(
        queue='queue_youtube',
        on_message_callback=callback_youtube_download,
    )
    print('Consumer is running')
    channel.start_consuming()


if __name__ == '__main__':
    main()